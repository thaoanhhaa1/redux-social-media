const UserModel = require('../models/userModel');
const mongoose = require('mongoose');
const { createError } = require('../../utils');
const { notificationService, followService } = require('../services');

module.exports = {
    countFollow: async (req, res, next) => {
        const _id = req.body._id;

        try {
            const result = await followService.countFollow(_id);

            res.json(result);
        } catch (error) {
            next(error);
        }
    },

    whoToFollow: async (req, res, next) => {
        const _id = req.body._id;
        const limit = req.query.limit || 5;
        const skip = req.query.skip || 0;

        try {
            const result = await followService.whoToFollow(_id, +skip, +limit);

            res.json(result);
        } catch (error) {
            next(error);
        }
    },

    // [POST] /api/private/follow/follow
    follow: async (req, res, next) => {
        const { userId, _id } = req.body;
        let session;

        try {
            session = await mongoose.startSession();
            session.startTransaction();

            const [user, isBlocked] = await Promise.all([
                UserModel.findById(userId),
                followService.isBlocked(_id, userId),
            ]);

            if (!user) throw createError(404, "User wasn't found!");
            if (isBlocked)
                throw createError(403, 'You are blocked by this user');

            const result = await followService.follow(_id, userId);

            if (result[0].modifiedCount === 0 || result[1].modifiedCount === 0)
                throw createError(400);

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
            next(error);
        } finally {
            await session.endSession();
        }
    },

    // [POST] /api/private/follow/unfollow
    unfollow: async (req, res, next) => {
        const { userId, _id } = req.body;
        let session;

        try {
            session = await mongoose.startSession();
            session.startTransaction();

            const user = await UserModel.findById(userId);

            if (!user) throw createError(404, "User wasn't found!");

            const result = await followService.unfollow(_id, userId);

            if (result[0].modifiedCount === 0 || result[1].modifiedCount === 0)
                throw createError(400);

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
            next(error);
        } finally {
            session.endSession();
        }
    },

    friends: async (req, res, next) => {
        const _id = req.body._id;
        const value = req.query.value;
        const tagged = req.query.tagged ?? [];

        try {
            const users = await followService.searchFriends(_id, value, tagged);

            res.json(users);
        } catch (error) {
            next(error);
        }
    },

    countWhoToFollow: async (req, res, next) => {
        const _id = req.body._id;

        try {
            res.json(await followService.countWhoToFollow(_id));
        } catch (error) {
            next(error);
        }
    },

    block: async (req, res, next) => {
        const { _id, userId } = req.body;

        try {
            if (!userId) throw createError(400);

            await followService.block(_id, userId);

            Promise.all([
                notificationService.deleteNotificationOfUserIdByUserId({
                    userId,
                    otherUserId: _id,
                }),
                notificationService.deleteNotificationOfUserIdByUserId({
                    userId: _id,
                    otherUserId: userId,
                }),
            ])
                .then(() => {
                    console.log('Blocked');
                })
                .catch((e) => {
                    console.error('🚀 ~ Block::', e);
                });

            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    },

    unblock: async (req, res, next) => {
        const { _id, userId } = req.body;

        try {
            if (!userId) throw createError(400);

            await followService.unblock(_id, userId);

            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    },
};
