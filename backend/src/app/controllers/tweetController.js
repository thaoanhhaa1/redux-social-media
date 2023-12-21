const { location, user } = require('../../utils');
const FollowModel = require('../models/followModel');
const TweetModel = require('../models/tweetModel');
const ListsModel = require('../models/listsModel');

module.exports = {
    count: async (req, res, next) => {
        const _id = req.body._id;

        try {
            const result = await TweetModel.find({
                'user._id': _id,
            }).count();

            res.json(result);
        } catch (error) {
            next(error);
        }
    },

    getMyTweets: async (req, res, next) => {
        const _id = req.body._id;
        const limit = +req.query.limit || 8;
        const skip = +req.query.skip || 0;

        try {
            const myTweets = await TweetModel.aggregate([
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

            res.json(myTweets);
        } catch (error) {
            next(error);
        }
    },

    createTweet: async (req, res, next) => {
        const {
            user,
            content,
            images,
            videos,
            group,
            feeling,
            location,
            tagPeople,
            gif,
        } = req.body;

        if (!user || !user._id || !user.username) return next(new Error());

        if (
            ![content, images, videos, feeling, location, tagPeople, gif].some(
                Boolean,
            )
        )
            return next(new Error());

        const { _id, username, name, avatar } = user;

        try {
            const tweet = new TweetModel({
                content,
                images,
                likes: [],
                user: { _id, username, name, avatar },
                videos,
                group,
                feeling,
                location,
                tagPeople: tagPeople ?? [],
                gif,
            });

            const result = await tweet.save();
            res.json(result);
        } catch (error) {
            next(error);
        }
    },

    // [GET] /api/private/tweets/get-following-tweets
    getFollowingTweets: async (req, res, next) => {
        const { _id } = req.body;

        try {
            const follows = await FollowModel.findOne({
                user: _id,
            });

            const following = follows.following;

            const tweets = await TweetModel.aggregate([
                {
                    $match: {
                        $expr: {
                            $in: ['$user._id', following],
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
                            $cond: [
                                { $gt: [{ $size: '$lists' }, 0] },
                                true,
                                false,
                            ],
                        },
                        'user.follow': true,
                    },
                },
            ]);

            res.json(tweets);
        } catch (error) {
            next(error);
        }
    },

    toggleLike: async (req, res, next) => {
        const { _id, tweetId, isLike } = req.body;
        const update = {
            [isLike ? '$addToSet' : '$pull']: {
                likes: _id,
            },
        };

        try {
            const result = await TweetModel.updateOne(
                {
                    _id: tweetId,
                },
                update,
            );

            if (result.modifiedCount > 0) return res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    },
};
