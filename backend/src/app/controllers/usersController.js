const FollowModel = require('../models/followModel');
const UserModel = require('../models/userModel');

module.exports = {
    getUser: async (req, res, next) => {
        try {
            const username = req.body.username;

            const user = await UserModel.findOne(
                {
                    username,
                },
                {
                    password: 0,
                },
            );

            res.json(user);
        } catch (error) {
            res.sendStatus(401);
        }
    },

    editProfile: async (req, res, next) => {
        const { _id, ...data } = req.body;

        try {
            const result = await UserModel.updateOne(
                {
                    _id,
                },
                data,
            );

            if (result.modifiedCount > 0) return res.sendStatus(201);
        } catch (error) {
            console.log('🚀 ~ editProfile: ~ error:', error);
        }

        res.sendStatus(400);
    },

    getContactUsers: async (req, res, next) => {
        const _id = req.body._id;

        try {
            const result = await FollowModel.aggregate([
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
            ]);

            res.send(result);
        } catch (error) {
            console.error('🚀 ~ getUsersOnline: ~ error:', error);
            res.sendStatus(400);
        }
    },
};
