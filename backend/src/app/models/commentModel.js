const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {
        post: {
            type: String,
            require: true,
        },
        user: {
            type: {
                _id: {
                    type: String,
                    require: true,
                },
                name: {
                    type: String,
                },
                avatar: {
                    type: String,
                    require: true,
                },
                username: {
                    type: String,
                    require: true,
                },
            },
            require: true,
        },
        content: {
            type: String,
            require: true,
        },
        likes: {
            type: [String],
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

CommentSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('comment', CommentSchema);
