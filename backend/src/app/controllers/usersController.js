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
    }
}

