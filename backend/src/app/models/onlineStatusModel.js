const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const onlineStatus = new Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    offline: {
        type: Date,
    },
});

module.exports = mongoose.model('online_status', onlineStatus);
