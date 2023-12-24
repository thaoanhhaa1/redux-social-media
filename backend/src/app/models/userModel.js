const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const UserModel = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        },
        background: {
            type: String,
        },
        name: {
            type: String,
        },
        bio: {
            type: String,
        },
        location: {
            type: String,
        },
        website: {
            type: String,
        },
        birthday: {
            type: Date,
        },
    },
    {
        timestamps: true,
    },
);

UserModel.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

// Queries
UserModel.statics.getUserDTO = function (_id) {
    return this.findById(_id, {
        name: 1,
        username: 1,
        avatar: 1,
    });
};

module.exports = mongoose.model('user', UserModel);
