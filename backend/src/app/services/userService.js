const userModel = require('../models/userModel');

module.exports = {
    findById: (_id) => userModel.findOne({ _id }),
    findDTOById: (_id) =>
        userModel.findOne(
            { _id },
            {
                name: 1,
                avatar: 1,
                username: 1,
            },
        ),
    findUserIdTodayBirthday: () => {
        const date = new Date();

        return userModel.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            {
                                $eq: [
                                    { $dayOfMonth: date },
                                    { $dayOfMonth: '$birthday' },
                                ],
                            },
                            {
                                $eq: [
                                    { $month: date },
                                    { $month: '$birthday' },
                                ],
                            },
                        ],
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                },
            },
        ]);
    },

    countUsers: () => userModel.find({}).count(),

    getUserDTO: function (_id) {
        return userModel.findById(_id, {
            name: 1,
            username: 1,
            avatar: 1,
        });
    },

    getUser: (username) =>
        userModel.findOne(
            {
                username,
            },
            {
                password: 0,
            },
        ),

    getContactUsers: (_id) =>
        userModel.aggregate([
            { $match: { user: _id } },
            { $project: { _id: 0, following: 1 } },
            { $unwind: '$following' },
            {
                $lookup: {
                    from: 'online_statuses',
                    let: { user: '$following' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: [{ $toString: '$_id' }, '$$user'],
                                },
                            },
                        },
                    ],
                    as: 'offline',
                },
            },
            { $unwind: '$offline' },
            {
                $addFields: {
                    offlinedAt: {
                        $cond: {
                            if: { $ifNull: ['$offline.offline', false] },
                            then: '$offline.offline',
                            else: '$$NOW',
                        },
                    },
                },
            },
            { $sort: { offlinedAt: -1 } },
            { $limit: 20 },
            {
                $lookup: {
                    from: 'users',
                    as: 'users',
                    let: { user: '$following', offline: '$offline' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: [{ $toString: '$_id' }, '$$user'],
                                },
                            },
                        },
                        {
                            $project: {
                                password: 0,
                                deleted: 0,
                                updatedAt: 0,
                                __v: 0,
                            },
                        },
                        { $addFields: { offline: '$$offline.offline' } },
                    ],
                },
            },
            { $unwind: '$users' },
            { $replaceWith: '$users' },
        ]),
};
