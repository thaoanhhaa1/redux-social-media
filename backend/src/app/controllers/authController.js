const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const FollowModel = require('../models/followModel');
const OnlineStatusModel = require('../models/onlineStatusModel');
const TokenModel = require('../models/tokenModel');
const { createError } = require('../../utils');

module.exports = {
    signUp: async (req, res, next) => {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            res.status(400).json({
                status: 400,
                message: 'Username, email and password are required',
            });
            return;
        }

        // Mật khẩu quá ngắn hoặc email không hợp lệ: 409

        const findUser = await UserModel.findOne({
            $or: [
                {
                    email,
                },
                {
                    username,
                },
            ],
        });

        if (findUser) {
            res.status(409).json({
                status: 409,
                message: 'Username or email already used',
            });
            return;
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(password, salt);

        const user = new UserModel({
            username,
            email,
            password: hashPassword,
        });

        try {
            const token = jwt.sign(
                {
                    username,
                    email,
                    _id: user._id,
                },
                process.env.TOKEN_SECRET,
                {
                    expiresIn: '1d',
                },
            );
            await user.save();

            new FollowModel({
                user: user._id,
                followers: [],
                following: [],
            }).save();

            new OnlineStatusModel({
                _id: user._id,
                offline: null,
            }).save();

            res.status(201).json(token);
        } catch (error) {
            next(error);
        }
    },

    signIn: async (req, res, next) => {
        const { email, password } = req.body;

        try {
            const user = await UserModel.findOne({
                email,
            });

            const result = await bcrypt.compare(password, user.password);

            if (result) {
                const token = jwt.sign(
                    {
                        email,
                        username: user.username,
                        _id: user._id,
                    },
                    process.env.TOKEN_SECRET,
                    {
                        expiresIn: '1d',
                    },
                );

                return res.json(token);
            }

            throw createError(401, 'Email or password is incorrect');
        } catch (error) {
            next(error);
        }
    },

    signOut: (req, res, next) => {
        const token = req.headers.authorization;

        try {
            const tokenModel = new TokenModel({
                token,
            });

            tokenModel.save().then();

            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    },
};
