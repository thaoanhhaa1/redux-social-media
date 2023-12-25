const { location, user } = require('../../utils');
const tweetModel = require('../models/tweetModel');

module.exports = {
    incNumberOfComments: (_id) =>
        tweetModel.updateOne(
            {
                _id,
            },
            {
                $inc: {
                    numberOfComments: 1,
                },
            },
        ),

    decNumberOfComments: (_id) =>
        tweetModel.updateOne(
            {
                _id,
            },
            {
                $inc: {
                    numberOfComments: -1,
                },
            },
        ),

    countTweetsByUserId: (_id) =>
        tweetModel
            .find({
                'user._id': _id,
            })
            .count(),

    getMyTweets: function (_id, skip, limit) {
        return tweetModel.aggregate([
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
    },

    getFollowingTweets: function (_id, following) {
        return tweetModel.aggregate([
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
                    pipeline: [
                        { $match: { $expr: { $in: ['$$id', '$list'] } } },
                    ],
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
    },

    toggleLike: function (_id, tweetId, isLike) {
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
    },
};
