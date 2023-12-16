const { default: mongoose } = require('mongoose');
const onlineStatusModel = require('../models/onlineStatusModel');

module.exports = {
    // [POST] /api/private/online-status
    updateOnlineStatus: async (req, res, next) => {
        const { _id } = req.body;

        try {
            await onlineStatusModel.updateOne(
                {
                    _id: new mongoose.Types.ObjectId(_id),
                },
                {
                    $unset: {
                        offline: 1,
                    },
                },
            );

            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    },
};
