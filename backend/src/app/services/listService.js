const followModel = require('../models/followModel');
const ListModel = require('../models/listsModel');

const NUMBER_USERS_OF_PAGE = 10;

module.exports = {
    remove: ({ _id, userId }) =>
        ListModel.updateOne({ _id }, { $pull: { list: { userId } } }),

    add: ({ _id, userId }) =>
        ListModel.updateOne(
            { _id },
            {
                $addToSet: {
                    list: {
                        userId,
                    },
                },
            },
        ),

    create: ({ _id, userId }) =>
        new ListModel({
            _id,
            list: [{ userId }],
        }).save(),

    findById: (id) => ListModel.findById(id),

    getUsers: async ({ userId, page }) => {
        const skip = (page - 1) * NUMBER_USERS_OF_PAGE;

        const follow = await followModel.findOne({ user: userId });
        const following = follow ? follow.following : [];

        const users = await ListModel.aggregate([
            {
                $match: {
                    _id: userId,
                },
            },
            {
                $unwind: '$list',
            },
            {
                $lookup: {
                    from: 'users',
                    as: 'user',
                    let: { id: '$list.userId' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: [
                                        {
                                            $toObjectId: '$$id',
                                        },
                                        '$_id',
                                    ],
                                },
                            },
                        },
                        {
                            $project: {
                                _id: 1,
                                username: 1,
                                name: 1,
                                avatar: 1,
                                background: 1,
                            },
                        },
                    ],
                },
            },
            {
                $unwind: '$user',
            },
            {
                $sort: {
                    'list.isPin': -1,
                    'user.name': 1,
                },
            },
            {
                $skip: skip,
            },
            {
                $limit: NUMBER_USERS_OF_PAGE,
            },
            {
                $lookup: {
                    from: 'follows',
                    localField: 'list.userId',
                    foreignField: 'user',
                    as: 'follows',
                },
            },
            {
                $unwind: {
                    path: '$follows',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $project: {
                    _id: '$user._id',
                    username: '$user.username',
                    name: '$user.name',
                    avatar: '$user.avatar',
                    background: '$user.background',
                    isPin: '$list.isPin',
                    followers: {
                        $cond: ['$follows', { $size: '$follows.followers' }, 0],
                    },
                    following: {
                        $cond: ['$follows', { $size: '$follows.following' }, 0],
                    },
                    isFollowing: {
                        $in: [
                            {
                                $toString: '$user._id',
                            },
                            following,
                        ],
                    },
                },
            },
        ]);

        return users;
    },

    countUsers: async (userId) => {
        const count = await ListModel.aggregate([
            {
                $match: {
                    _id: userId,
                },
            },
            {
                $unwind: '$list',
            },
            {
                $count: 'count',
            },
        ]);

        return Math.ceil((count[0].count || 0) / NUMBER_USERS_OF_PAGE);
    },

    togglePin: async ({ _id, userId, isPin }) => {
        const res = await ListModel.updateOne(
            { _id, 'list.userId': userId },
            {
                $set: {
                    'list.$[element].isPin': isPin,
                },
            },
            {
                arrayFilters: [{ 'element.userId': userId }],
            },
        );

        return res.modifiedCount;
    },
};
