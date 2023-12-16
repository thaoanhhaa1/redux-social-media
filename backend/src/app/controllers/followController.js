const FollowModel = require('../models/followModel');
const UserModel = require('../models/userModel');
const mongoose = require('mongoose');

module.exports = {
    countFollow: async (req, res) => {
        const _id = req.body._id;

        try {
            const result = await FollowModel.aggregate([
                {
                    $match: {
                        user: _id,
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

            if (result.length === 0) res.json([0, 0]);
            else {
                const { followers, following } = result[0];
                res.json([followers, following]);
            }
        } catch (error) {
            console.log('🚀 ~ countFollow: ~ error:', error);
            res.status(400).sendStatus({
                status: 400,
                message: 'Bad request',
            });
        }
    },

    whoToFollow: async (req, res) => {
        const _id = req.body._id;
        const limit = req.query.limit || 5;
        const skip = req.query.skip || 0;

        try {
            const result = await FollowModel.aggregate([
                {
                    $match: {
                        user: _id,
                    },
                },
                {
                    $lookup: {
                        let: {
                            followers: '$followers',
                            following: '$following',
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
                                                    _id,
                                                ],
                                            },
                                            {
                                                $cond: [
                                                    {
                                                        $in: [
                                                            {
                                                                $toString:
                                                                    '$_id',
                                                            },
                                                            '$$following',
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
                    $skip: +skip,
                },
                {
                    $limit: +limit,
                },
            ]);
            res.json(result);
        } catch (error) {
            console.log('🚀 ~ whoToFollow: ~ error:', error);
            res.sendStatus(400);
        }
    },

    // [POST] /api/private/follow/follow
    follow: async (req, res) => {
        const { userId, _id } = req.body;
        let session;

        try {
            session = await mongoose.startSession();
            session.startTransaction();

            const user = await UserModel.findById(userId);

            if (!user) throw new Error('User not found!');

            const result = await Promise.all([
                FollowModel.updateOne(
                    {
                        user: _id,
                    },
                    {
                        $addToSet: {
                            following: userId,
                        },
                    },
                ),
                FollowModel.updateOne(
                    {
                        user: userId,
                    },
                    {
                        $addToSet: {
                            followers: _id,
                        },
                    },
                ),
            ]);
            if (result[0].modifiedCount === 0 || result[1].modifiedCount === 0)
                throw new Error('Update fail!');

            await session.commitTransaction();

            // SOCKET
            global.sockets.forEach((socket) => {
                const socketID = socket.id;
                const userID = socket.handshake?.auth?._id;

                if (![_id, userId].includes(userID)) return;

                // To me
                if (userID === _id)
                    global.socketIo.to(socketID).emit('following');

                // To following
                if (userID === userId)
                    global.socketIo.to(socketID).emit('follower');
            });

            res.sendStatus(200);
        } catch (error) {
            console.error('🚀 ~ follow: ~ error:', error);
            res.sendStatus(400);
        } finally {
            await session.endSession();
        }
    },

    // [POST] /api/private/follow/unfollow
    unfollow: async (req, res) => {
        const { userId, _id } = req.body;
        let session;

        try {
            session = await mongoose.startSession();
            session.startTransaction();

            const user = await UserModel.findById(userId);

            if (!user) throw new Error('User not found!');

            const result = await Promise.all([
                FollowModel.updateOne(
                    {
                        user: _id,
                    },
                    {
                        $pull: {
                            following: userId,
                        },
                    },
                ),
                FollowModel.updateOne(
                    {
                        user: userId,
                    },
                    {
                        $pull: {
                            followers: _id,
                        },
                    },
                ),
            ]);
            if (result[0].modifiedCount === 0 || result[1].modifiedCount === 0)
                throw new Error('Update fail!');

            session.commitTransaction();

            // SOCKET
            global.sockets.forEach((socket) => {
                const socketID = socket.id;
                const userID = socket.handshake?.auth?._id;

                if (![_id, userId].includes(userID)) return;

                // To me
                if (userID === _id)
                    global.socketIo.to(socketID).emit('un-following');

                // To following
                if (userID === userId)
                    global.socketIo.to(socketID).emit('un-follower');
            });

            res.sendStatus(200);
        } catch (error) {
            session.abortTransaction();
            console.error(error);
            res.sendStatus(400);
        } finally {
            session.endSession();
        }
    },

    friends: async (req, res) => {
        const _id = req.body._id;
        const value = req.query.value;
        const tagged = req.query.tagged ?? [];

        try {
            const users = await FollowModel.aggregate([
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
                                                                $toString:
                                                                    '$_id',
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
            ]);

            res.json(users);
        } catch (error) {
            res.json([]);
            console.error('🚀 ~ followers: ~ error:', error);
        }
    },
};
