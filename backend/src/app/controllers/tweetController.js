const FollowModel = require('../models/followModel');
const TweetModel = require('../models/tweetModel');
const { notificationType } = require('../../constants');
const { tweetService, notificationService } = require('../services');
const { errors } = require('../../utils');

module.exports = {
    count: async (req, res, next) => {
        const _id = req.body._id;

        try {
            const result = await tweetService.countTweetsByUserId(_id);

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
            const myTweets = await tweetService.getMyTweets(_id, skip, limit);

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

            notificationService
                .insertToFollowers(_id, {
                    document: result._id,
                    type: notificationType.POST_TWEET,
                })
                .then(() => console.log('~~~ insertToFollowers ok'));

            res.json(result);
        } catch (error) {
            next(error);
        }
    },

    getTweet: async (req, res, next) => {
        const tweetId = req.params.tweet_id;
        const { _id } = req.body;

        try {
            const tweet = await tweetService.getTweet({ tweetId, userId: _id });

            if (tweet) return res.json(tweet);

            res.status(404).json(errors[404]("Tweet wasn't found"));
        } catch (error) {
            next(error);
        }
    },

    // [GET] /api/private/tweets/get-following-tweets
    getFollowingTweets: async (req, res, next) => {
        const { _id } = req.body;
        const page = +req.query.page || 1;

        try {
            const follows = await FollowModel.findOne({
                user: _id,
            });

            const following = follows.following;

            const tweets = await tweetService.getFollowingTweets(
                _id,
                following,
                page,
            );

            res.json(tweets);
        } catch (error) {
            next(error);
        }
    },

    countFollowingTweets: async (req, res, next) => {
        const { _id } = req.body;

        try {
            const count = await tweetService.countFollowingTweets(_id);

            res.json(count ?? 0);
        } catch (error) {
            next(error);
        }
    },

    toggleLike: async (req, res, next) => {
        const { _id, tweetId, isLike } = req.body;

        try {
            const [result, tweet] = await Promise.all([
                tweetService.toggleLike(_id, tweetId, isLike),
                TweetModel.findOne({ _id: tweetId }),
            ]);

            if (result.modifiedCount > 0) {
                if (isLike) {
                    if (tweet && !tweet.notInterested.includes(tweet.user._id))
                        notificationService
                            .insertToFollowers(_id, {
                                document: tweetId,
                                type: notificationType.LIKE_TWEET,
                                description: tweet?.content,
                            })
                            .then(() =>
                                console.log('~~~ insertToFollowers ok'),
                            );
                } else
                    notificationService
                        .dislikeTweet(_id, tweetId)
                        .then(() => console.log('~~~ dislikeTweet ok'));

                return res.sendStatus(200);
            }
        } catch (error) {
            return next(error);
        }

        next(new Error());
    },

    notInterested: async (req, res, next) => {
        const _id = req.body._id;
        const tweetId = req.params.tweet_id;

        try {
            await Promise.all([
                notificationService.deleteTweetAndRelationByUserId(
                    _id,
                    tweetId,
                ),
                tweetService.addNotInterested(_id, tweetId),
            ]);

            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    },

    interested: async (req, res, next) => {
        const _id = req.body._id;
        const tweetId = req.params.tweet_id;

        try {
            await Promise.all([tweetService.removeNotInterested(_id, tweetId)]);

            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    },
};
