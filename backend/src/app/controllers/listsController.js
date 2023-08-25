const ListModel = require('../models/listsModel');

module.exports = {
    // [POST] /api/private/lists/add
    // body: userId
    add: async (req, res, next) => {
        const { _id, userId } = req.body;

        try {
            const find = await ListModel.findOne({ _id });

            if (find) {
                await ListModel.updateOne(
                    { _id },
                    { $addToSet: { list: userId } },
                );
            } else {
                await new ListModel({
                    _id,
                    list: [userId],
                }).save();
            }
            res.json({ result: userId });
        } catch (error) {
            next(error);
        }
    },

    // [POST] /api/private/lists/remove
    // body: userId
    remove: async (req, res, next) => {
        const { _id, userId } = req.body;

        try {
            await ListModel.updateOne({ _id }, { $pull: { list: userId } });

            res.json({ result: userId });
        } catch (error) {
            next(error);
        }
    },
};
