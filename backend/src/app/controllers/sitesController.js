const UserModel = require('../models/userModel');

module.exports = {
    search: async (req, res, next) => {
        const searchValue = req.params.search;

        const { limit, skip } = req.query;

        const regex = new RegExp(searchValue);
        const users = await UserModel.find(
            {
                $or: [
                    {
                        username: regex,
                    },
                    {
                        email: regex,
                    },
                    {
                        name: regex,
                    },
                ],
            },
            {
                password: 0,
                deleted: 0,
                createdAt: 0,
                updatedAt: 0,
                __v: 0,
            },
        )
            .skip(skip || 0)
            .limit(limit);

        res.json(users);
    },
};
