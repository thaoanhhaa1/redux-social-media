const UserModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    signUp: async (req, res, next) => {
        const {
            email,
            username,
            password
        } = req.body;

        if (!email || !username || !password) {
            res.status(400).send("Username, email and password are required")
            return;
        }

        // Mật khẩu quá ngắn hoặc email không hợp lệ: 409

        const findUser = await UserModel.findOne({
            "$or": [{
                email
            }, {
                username
            }]
        })

        if (findUser) {
            res.status(409).send("Username or email already used")
            return;
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(password, salt);

        const user = new UserModel({
            username,
            email,
            password: hashPassword
        })

        try {
            const token = jwt.sign({
                username,
                email
            }, process.env.TOKEN_SECRET, {
                expiresIn: '1d'
            })
            await user.save();
            res.status(201).json(token)
        } catch (error) {
            res.status(500).send('Server is down')
            console.error(error)
        }
    },

    getUser: async (req, res, next) => {
        const token = req.headers.authorization

        if (!token) {
            res.sendStatus(401)
            return;
        }

        try {
            const {
                username
            } = jwt.verify(token, process.env.TOKEN_SECRET)

            const user = await UserModel.findOne({
                username
            }, {
                password: 0
            })

            res.json(user)
        } catch (error) {
            res.sendStatus(401)
        }
    },

    signIn: async (req, res, next) => {
        const {
            email,
            password
        } = req.body;

        try {
            const user = await UserModel.findOne({
                email
            })

            const result = await bcrypt.compare(password, user.password)

            if (result) {
                const token = jwt.sign({
                    email,
                    username: user.username
                }, process.env.TOKEN_SECRET, {
                    expiresIn: '1d'
                })

                res.json(token)
                return;
            }
        } catch (error) {}

        res.sendStatus(400)
    }
}