const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FollowModel = new Schema({
    user: {
        type: String,
        required: true,
    },
    followers: {
        type: Array,
        required: true,
    },
    following: {
        type: Array,
        required: true,
    },
});

module.exports = mongoose.model('follow', FollowModel);
