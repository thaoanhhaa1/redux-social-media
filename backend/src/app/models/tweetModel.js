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
        feeling: {
            title: {
                type: String,
            },
            image: {
                type: String,
            },
        },
        location: {
            type: String,
        },
        tagPeople: {
            type: Array,
        },
        gif: {
            title: {
                type: String,
            },
            url: {
                type: String,
            },
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('tweet', tweetModel);
