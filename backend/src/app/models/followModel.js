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

FollowModel.statics.getFollowing = function (_id) {
    return this.aggregate([
        { $match: { user: _id } },
        { $project: { followers: 0, _id: 0, __v: 0 } },
    ]);
};

FollowModel.statics.getFollower = function (_id) {
    return this.findOne(
        {
            user: _id,
        },
        { following: 0, _id: 0, __v: 0 },
    );
};

module.exports = mongoose.model('follow', FollowModel);
