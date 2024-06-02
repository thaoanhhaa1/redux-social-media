const { createError } = require('../../utils');
const UserModel = require('../models/userModel');
const { userService, tweetService, followService } = require('../services');

module.exports = {
    getUser: async (req, res, next) => {
        try {
            const username = req.body.username;

            const user = await userService.getUser(username);

            res.json(user);
        } catch (error) {
            next(error);
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

        next(new Error());
    },

    getContactUsers: async (req, res, next) => {
        const _id = req.body._id;

        try {
            const result = await userService.getContactUsers(_id);

            res.send(result);
        } catch (error) {
            next(error);
        }
    },

    getTweetsByUser: async (req, res, next) => {
        const userId = req.params.user_id;
        const _id = req.body._id;
        const page = +(req.query.page ?? 1);

        try {
            const [user, isBlocked] = await Promise.all([
                userService.findById(userId),
                followService.isBlocked(userId, _id),
            ]);

            if (!user) throw createError(404, 'User not found');

            if (isBlocked)
                throw createError(403, 'You are blocked by this user');

            const tweets = await tweetService.getTweetsByUserId(
                _id,
                userId,
                page,
            );

            res.json(tweets);
        } catch (error) {
            next(error);
        }
    },
};
