const {
    Types: { ObjectId },
} = require('mongoose');
const onlineStatusModel = require('../models/onlineStatusModel');

module.exports = {
    setOffline: ({ userId, date }) =>
        onlineStatusModel.updateOne(
            {
                _id: new ObjectId(userId),
            },
            {
                $set: {
                    offline: date,
                },
            },
        ),
};
