const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const tweetModel = new Schema(
    {
        user: {
            _id: {
                type: String,
                required: true,
            },
            name: {
                type: String,
            },
            avatar: {
                type: String,
            },
            username: {
                type: String,
                required: true,
            },
        },
        content: {
            type: String,
        },
        images: {
            type: Array,
            default: [],
        },
        videos: {
            type: Array,
            default: [],
        },
        likes: {
            type: Array,
            required: true,
            default: [],
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
            required: true,
            default: [],
        },
        gif: {
            title: {
                type: String,
            },
            url: {
                type: String,
            },
        },
        numberOfComments: {
            type: Number,
            min: 0,
            default: 0,
        },
        viewed: {
            type: [String],
            default: [],
        },
        notInterested: {
            type: [String],
            default: [],
        },
        reporters: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    },
);

tweetModel.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});

module.exports = mongoose.model('tweet', tweetModel);
