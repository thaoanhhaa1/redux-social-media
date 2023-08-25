const { default: mongoose } = require('mongoose');
const onlineStatusModel = require('../models/onlineStatusModel');

module.exports = {
    // [POST] /api/private/online-status
    updateOnlineStatus: async (req, res, next) => {
        const { _id } = req.body;

        try {
            const result = await onlineStatusModel.updateOne(
                {
                    _id: new mongoose.Types.ObjectId(_id),
                },
                {
                    $unset: {
                        offline: 1,
                    },
                },
            );

            if (result.modifiedCount > 0) return res.sendStatus(200);
        } catch (error) {
            next(error);
        }

        res.sendStatus(400);
    },
};
