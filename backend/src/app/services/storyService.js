const storyModel = require('../models/storyModel');
const followModel = require('../models/followModel');

module.exports = {
    getStories: function (_id, following) {
        return storyModel.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            {
                                $gte: [
                                    '$createdAt',
                                    {
                                        $dateSubtract: {
                                            startDate: '$$NOW',
                                            unit: 'day',
                                            amount: 1,
                                        },
                                    },
                                ],
                            },
                            {
                                $or: [
                                    {
                                        $eq: ['$user', _id],
                                    },
                                    {
                                        $in: ['$user', following],
                                    },
                                ],
                            },
                        ],
                    },
                },
            },
            {
                $sort: {
                    user: 1,
                },
            },
        ]);
    },

    getStoriesGroupByUsers: (_id) =>
        followModel.aggregate([
            { $match: { user: _id } },
            { $project: { _id: 0, following: 1 } },
            {
                $set: {
                    following: {
                        $concatArrays: ['$following', [_id]],
                    },
                },
            },
            { $unwind: '$following' },
            {
                $lookup: {
                    from: 'stories',
                    as: 'stories',
                    let: { id: '$following' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$$id', '$user'] },
                                        {
                                            $gte: [
                                                '$createdAt',
                                                {
                                                    $dateSubtract: {
                                                        startDate: '$$NOW',
                                                        unit: 'day',
                                                        amount: 1,
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                },
                            },
                        },
                        {$addFields: {
                            url: '$story'
                        }},
                        {
                            $project: {
                                createdAt: 1,
                                url: 1
                            },
                        },
                    ],
                },
            },
            {
                $match: {
                    $expr: {
                        $gt: [{ $size: '$stories' }, 0],
                    },
                },
            },
            {
                $lookup: {
                    from: 'users',
                    let: { id: '$following' },
                    as: 'user',
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: [{ $toString: '$_id' }, '$$id'],
                                },
                            },
                        },
                        { $project: { username: 1, name: 1, avatar: 1 } },
                    ],
                },
            },
            {
                $unwind: '$user',
            },
            { $project: { following: 0 } },
        ]),
};
