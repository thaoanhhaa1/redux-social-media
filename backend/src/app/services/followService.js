const listService = require('./listService');
const followModel = require('../models/followModel');
const userService = require('./userService');

module.exports = {
    countFollow: async (userId) => {
        const result = await followModel.aggregate([
            {
                $match: {
                    user: userId,
                },
            },
            {
                $project: {
                    _id: 0,
                    followers: {
                        $size: '$followers',
                    },
                    following: {
                        $size: '$following',
                    },
                },
            },
        ]);

        if (result.length === 0) return [0, 0];
        const { followers, following } = result[0];

        return [followers, following];
    },

    whoToFollow: (userId, skip, limit) =>
        followModel.aggregate([
            {
                $match: {
                    user: userId,
                },
            },
            {
                $lookup: {
                    let: {
                        followers: '$followers',
                        following: '$following',
                        blocks: '$blocks',
                        beenBlocks: '$beenBlocks',
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $ne: [
                                                {
                                                    $toString: '$_id',
                                                },
                                                userId,
                                            ],
                                        },
                                        {
                                            $cond: [
                                                {
                                                    $in: [
                                                        {
                                                            $toString: '$_id',
                                                        },
                                                        {
                                                            $setUnion: [
                                                                '$$following',
                                                                '$$blocks',
                                                                '$$beenBlocks',
                                                            ],
                                                        },
                                                    ],
                                                },
                                                false,
                                                true,
                                            ],
                                        },
                                    ],
                                },
                            },
                        },
                        {
                            $project: {
                                password: 0,
                                createdAt: 0,
                                deleted: 0,
                                updatedAt: 0,
                                __v: 0,
                            },
                        },
                        {
                            $addFields: {
                                priority: {
                                    $cond: [
                                        {
                                            $in: [
                                                {
                                                    $toString: '$_id',
                                                },
                                                '$$followers',
                                            ],
                                        },
                                        1,
                                        0,
                                    ],
                                },
                            },
                        },
                        {
                            $sort: {
                                priority: -1,
                            },
                        },
                    ],
                    as: 'users',
                    from: 'users',
                },
            },
            {
                $unwind: '$users',
            },
            {
                $replaceWith: '$users',
            },
            {
                $skip: skip,
            },
            {
                $limit: limit,
            },
        ]),

    searchFriends: (_id, value, tagged) =>
        followModel.aggregate([
            { $match: { user: _id } },
            {
                $project: {
                    users: {
                        $setIntersection: ['$followers', '$following'],
                    },
                    _id: 0,
                },
            },
            { $unwind: '$users' },
            {
                $lookup: {
                    from: 'users',
                    as: 'users',
                    let: { userId: '$users' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $eq: [
                                                '$$userId',
                                                { $toString: '$_id' },
                                            ],
                                        },
                                        {
                                            $or: [
                                                {
                                                    $regexMatch: {
                                                        input: '$name',
                                                        regex: new RegExp(
                                                            value,
                                                            'i',
                                                        ),
                                                    },
                                                },
                                                {
                                                    $and: [
                                                        {
                                                            $not: {
                                                                $ifNull: [
                                                                    '$name',
                                                                    0,
                                                                ],
                                                            },
                                                        },
                                                        {
                                                            $regexMatch: {
                                                                input: '$username',
                                                                regex: new RegExp(
                                                                    value,
                                                                    'i',
                                                                ),
                                                            },
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            $not: [
                                                {
                                                    $in: [
                                                        {
                                                            $toString: '$_id',
                                                        },
                                                        tagged,
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            },
                        },
                        {
                            $limit: (value && 10) || 20,
                        },
                        {
                            $project: {
                                email: 0,
                                password: 0,
                                deleted: 0,
                                createdAt: 0,
                                updatedAt: 0,
                                __v: 0,
                                background: 0,
                                bio: 0,
                                birthday: 0,
                                location: 0,
                                website: 0,
                            },
                        },
                    ],
                },
            },
            { $unwind: '$users' },
            { $replaceWith: '$users' },
        ]),

    follow: (_id, userId) =>
        Promise.all([
            followModel.updateOne(
                {
                    user: _id,
                },
                {
                    $addToSet: {
                        following: userId,
                    },
                },
            ),
            followModel.updateOne(
                {
                    user: userId,
                },
                {
                    $addToSet: {
                        followers: _id,
                    },
                },
            ),
        ]),

    unfollow: (_id, userId) =>
        Promise.all([
            followModel.updateOne(
                {
                    user: _id,
                },
                {
                    $pull: {
                        following: userId,
                    },
                },
            ),
            followModel.updateOne(
                {
                    user: userId,
                },
                {
                    $pull: {
                        followers: _id,
                    },
                },
            ),
        ]),

    countWhoToFollow: async function (_id) {
        const [[, following], user] = await Promise.all([
            this.countFollow(_id),
            userService.countUsers(),
        ]);

        return user - following - 1;
    },

    getFollowing: (_id) =>
        followModel.aggregate([
            { $match: { user: _id } },
            { $project: { followers: 0, _id: 0, __v: 0 } },
        ]),

    getFollower: (_id) =>
        followModel.findOne(
            {
                user: _id,
            },
            { following: 0, _id: 0, __v: 0 },
        ),

    block: (_id, userId) =>
        Promise.all([
            followModel.updateOne(
                { user: _id },
                {
                    $addToSet: {
                        blocks: userId,
                    },
                    $pull: {
                        following: userId,
                        followers: userId,
                    },
                },
            ),
            followModel.updateOne(
                { user: userId },
                {
                    $addToSet: {
                        beenBlocks: _id,
                    },
                    $pull: {
                        following: _id,
                        followers: _id,
                    },
                },
            ),
            listService.remove({ _id, userId }),
        ]),

    unblock: (_id, userId) =>
        Promise.all([
            followModel.updateOne(
                { user: _id },
                {
                    $pull: {
                        blocks: userId,
                    },
                },
            ),
            followModel.updateOne(
                { user: userId },
                {
                    $pull: {
                        beenBlocks: _id,
                    },
                },
            ),
        ]),

    isBlocked: async (_id, userId) => {
        const [block, blocked] = await Promise.all([
            followModel.findOne({ user: _id, blocks: userId }),
            followModel.findOne({ user: userId, blocks: _id }),
        ]);

        return block || blocked;
    },

    getBlocks: (_id) =>
        followModel.aggregate([
            {
                $match: {
                    user: _id,
                },
            },
            {
                $lookup: {
                    from: 'users',
                    as: 'blocks',
                    let: {
                        blocks: '$blocks',
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: [
                                        {
                                            $toString: '$_id',
                                        },
                                        '$$blocks',
                                    ],
                                },
                            },
                        },
                        {
                            $project: {
                                username: 1,
                                name: 1,
                                avatar: 1,
                            },
                        },
                    ],
                },
            },
            {
                $unwind: '$blocks',
            },
            {
                $replaceWith: '$blocks',
            },
        ]),
};
