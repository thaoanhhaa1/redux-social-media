const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {
        post: {
            type: String,
            require: true,
        },
        user: {
            type: String,
            require: true,
        },
        comment: {
            type: String,
            require: true,
        },
        like: {
            type: Array,
            require: true,
        },
        parent: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('comment', CommentSchema);
