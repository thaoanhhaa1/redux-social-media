const UserModel = require('../models/userModel')

module.exports = {
    getUser: async (req, res, next) => {
        try {
            const username = req.body.username

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

    editProfile: async (req, res, next) => {
        const {
            _id,
            ...data
        } = req.body;

        try {
            const result = await UserModel.updateOne({
                _id
            }, data)

            if (result.modifiedCount > 0)
                return res.sendStatus(201)
        } catch (error) {
            console.log("🚀 ~ editProfile: ~ error:", error)
        }

        res.sendStatus(400)
    }
}