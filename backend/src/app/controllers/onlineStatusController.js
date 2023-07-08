const { default: mongoose } = require('mongoose');
const onlineStatusModel = require('../models/onlineStatusModel');

module.exports = {
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
            console.log('🚀 ~ updateOnlineStatus: ~ result:', result);

            if (result.modifiedCount > 0) return res.sendStatus(200);
        } catch (error) {
            console.error('🚀 ~ updateOnlineStatus: ~ error:', error);
        }

        res.sendStatus(400);
    },
};
