const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tweetModel = new Schema(
    {
        user: {
            type: String,
            required: true,
        },
        content: {
            type: String,
        },
        images: {
            type: Array,
        },
        videos: {
            type: Array,
        },
        likes: {
            type: Array,
            required: true,
        },
        group: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('tweet', tweetModel);
