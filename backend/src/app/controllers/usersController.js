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
            res.status(401).json({
                status: 401,
                message: 'Unauthorized',
            });
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

            const user = await UserModel.findOne(
                { _id },
                {
                    password: 0,
                },
            );

            if (result.modifiedCount > 0) return res.status(201).json(user);
        } catch (error) {
            console.log('🚀 ~ editProfile: ~ error:', error);
        }

        res.status(400).sendStatus({
            status: 400,
            message: 'Bad request',
        });
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
            res.status(400).sendStatus({
                status: 400,
                message: 'Bad request',
            });
        }
    },
};
