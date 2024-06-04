const followService = require('./followService');
const tweetModel = require('../models/tweetModel');
const { default: mongoose } = require('mongoose');
const { locationQueries, userQueries } = require('../queries');

const NUMBER_OF_PAGE = 10;

const getDetailTweets = ({ query, userId, page = 1, sort = false }) => {
    const skip = (page - 1) * NUMBER_OF_PAGE;

    const pageQuery = [
        {
            $skip: skip,
        },
        {
            $limit: NUMBER_OF_PAGE,
        },
    ];

    if (sort) {
        pageQuery.unshift({
            $sort: {
                numberOfComments: -1,
                numberOfLikes: -1,
                createdAt: -1,
            },
        });
    }

    return tweetModel.aggregate([
        {
            $match: query,
        },
        ...locationQueries.lookupLocation,
        userQueries.lookupTagUser,
        {
            $lookup: {
                from: 'lists',
                as: 'lists',
                let: { id: '$user._id' },
                pipeline: [{ $match: { $expr: { $in: ['$$id', '$list'] } } }],
            },
        },
        {
            $lookup: {
                from: 'follows',
                as: 'user.follow',
                let: { id: '$user._id' },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ['$user', userId] },
                        },
                    },
                    {
                        $project: {
                            following: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: '$user.follow',
        },
        {
            $addFields: {
                'user.isInList': {
                    $cond: [{ $gt: [{ $size: '$lists' }, 0] }, true, false],
                },
                'user.follow': {
                    $cond: [
                        { $in: ['$user._id', '$user.follow.following'] },
                        true,
                        false,
                    ],
                },
                numberOfLikes: { $size: '$likes' },
            },
        },
        ...pageQuery,
        {
            $addFields: {
                notInterested: {
                    $in: [userId, '$notInterested'],
                },
                report: {
                    $in: [userId, '$reporters'],
                },
            },
        },
    ]);
};

module.exports = {
    findById: (id) => tweetModel.findById(id),

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
            ...locationQueries.lookupLocation,
            userQueries.lookupTagUser,
            {
                $addFields: {
                    'user.isInList': false,
                    'user.follow': false,
                    notInterested: {
                        $in: [_id, '$notInterested'],
                    },
                    report: false,
                },
            },
        ]);
    },

    getFollowingTweets: function (_id, following, page) {
        return getDetailTweets({
            query: {
                $expr: {
                    $and: [
                        {
                            $in: ['$user._id', following],
                        },
                        {
                            $not: [{ $in: [_id, '$viewed'] }],
                        },
                        {
                            $not: [{ $in: [_id, '$notInterested'] }],
                        },
                        {
                            $not: [
                                {
                                    $in: [_id, '$reporters'],
                                },
                            ],
                        },
                    ],
                },
            },
            userId: _id,
            page,
            sort: true,
        });
    },

    countFollowingTweets: async (_id) => {
        const follow = await followService.getFollowing(_id);

        const following = follow[0].following;

        const count = await tweetModel.aggregate([
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
            {
                $count: 'count',
            },
        ]);

        return count[0]?.count || 0;
    },

    toggleLike: function (_id, tweetId, isLike) {
        return tweetModel.updateOne(
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

    getNotInterestedById: async (_id) => {
        const tweet = await tweetModel.findOne(
            { _id },
            {
                notInterested: 1,
            },
        );

        return tweet.notInterested;
    },

    addNotInterested: (userId, tweetId) =>
        tweetModel.updateOne(
            { _id: tweetId },
            { $addToSet: { notInterested: userId } },
        ),

    removeNotInterested: (userId, tweetId) =>
        tweetModel.updateOne(
            { _id: tweetId },
            { $pull: { notInterested: userId } },
        ),

    getTweet: async ({ tweetId, userId }) => {
        const tweets = await getDetailTweets({
            query: {
                _id: new mongoose.Types.ObjectId(tweetId),
            },
            userId,
        });

        return tweets[0];
    },

    getTweetsByUserId: (_id, userId, page) => {
        return getDetailTweets({
            query: {
                $expr: {
                    $and: [
                        {
                            $eq: ['$user._id', userId],
                        },
                    ],
                },
            },
            userId: _id,
            page,
        });
    },

    addReporter: (userId, tweetId) =>
        tweetModel.updateOne(
            { _id: tweetId },
            { $addToSet: { reporters: userId } },
        ),

    removeReporter: (userId, tweetId) =>
        tweetModel.updateOne(
            { _id: tweetId },
            { $pull: { reporters: userId } },
        ),
};
