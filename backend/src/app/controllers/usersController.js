const { errors } = require('../../utils');
const UserModel = require('../models/userModel');
const { userService, tweetService } = require('../services');

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
            const user = await userService.findById(userId);

            if (!user)
                return res.status(404).json(errors[404]("User wasn't found"));

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
