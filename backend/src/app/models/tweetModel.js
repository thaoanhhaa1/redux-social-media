const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const { user, location } = require('../../utils');

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
    },
    {
        timestamps: true,
    },
);

tweetModel.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});

// Queries
tweetModel.statics.countTweetsByUserId = function (_id) {
    return this.find({
        'user._id': _id,
    }).count();
};

tweetModel.statics.getMyTweets = function (_id, skip, limit) {
    return this.aggregate([
        { $match: { 'user._id': _id } },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
        ...location.lookup,
        user.tagPeople,
        {
            $addFields: {
                'user.isInList': false,
                'user.follow': false,
            },
        },
    ]);
};

tweetModel.statics.getFollowingTweets = function (_id, following) {
    return this.aggregate([
        {
            $match: {
                $expr: {
                    $and: [
                        {
                            $in: ['$user._id', following],
                        },
                        {
                            $not: [{ $in: [_id, '$viewed'] }],
                        },
                    ],
                },
            },
        },
        ...location.lookup,
        user.tagPeople,
        {
            $lookup: {
                from: 'lists',
                as: 'lists',
                let: { id: '$user._id' },
                pipeline: [{ $match: { $expr: { $in: ['$$id', '$list'] } } }],
            },
        },
        {
            $addFields: {
                'user.isInList': {
                    $cond: [{ $gt: [{ $size: '$lists' }, 0] }, true, false],
                },
                'user.follow': true,
                numberOfLikes: { $size: '$likes' },
            },
        },
        {
            $sort: {
                numberOfComments: -1,
                numberOfLikes: -1,
                createdAt: -1,
            },
        },
    ]);
};

tweetModel.statics.toggleLike = function (_id, tweetId, isLike) {
    return this.updateOne(
        {
            _id: tweetId,
        },
        {
            [isLike ? '$addToSet' : '$pull']: {
                likes: _id,
            },
        },
    );
};

module.exports = mongoose.model('tweet', tweetModel);
