const FollowModel = require('../models/followModel');
const TweetModel = require('../models/tweetModel');
const { notificationType, socketEvents } = require('../../constants');
const {
    tweetService,
    notificationService,
    followService,
    userService,
} = require('../services');
const { createError } = require('../../utils');

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

    countTweetByUser: async (req, res, next) => {
        const userId = req.params.user_id;

        try {
            const result = await tweetService.countTweetsByUserId(userId);

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
                    tweetUsername: username,
                    tweetId: tweet._id,
                    content,
                })
                .then(() => console.log('~~~ insertToFollowers ok'));

            res.json(result);
        } catch (error) {
            next(error);
        }
    },

    getTweet: async (req, res, next) => {
        const tweetId = req.params.tweet_id;
        const username = req.params.user_id;
        const { _id } = req.body;

        try {
            const userId = await userService.getIdFromUsername(username);

            if (!userId) throw createError(404, 'User not found');

            const [tweet, isBlocked] = await Promise.all([
                tweetService.getTweet({ tweetId, userId: _id }),
                followService.isBlocked(userId, _id),
            ]);

            if (isBlocked)
                throw createError(403, 'You are blocked by this user');

            if (tweet && tweet.user._id === userId) return res.json(tweet);

            throw createError(404, 'Tweet not found');
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

            if (result.modifiedCount <= 0) throw new Error();

            if (isLike) {
                const tweetOwner = tweet.user._id;

                if (
                    tweet &&
                    !tweet.notInterested.includes(tweetOwner) &&
                    tweetOwner !== _id
                ) {
                    notificationService
                        .likeTweet(_id, tweetOwner, {
                            document: tweetId,
                            type: notificationType.LIKE_TWEET,
                            description: tweet?.content,
                            tweetUsername: tweet.user.username,
                            tweetId: tweet._id,
                        })
                        .then((notification) => {
                            global.socketIo
                                .in(tweetOwner)
                                .emit(
                                    socketEvents.emit.NOTIFICATION,
                                    notification,
                                );
                        })
                        .catch((error) => {
                            console.log('🚀 ~ .catch ~ error:', error);
                        });
                }
            } else
                notificationService.dislikeTweet(_id, tweetId).then(() => {});

            global.socketIo.emit(
                socketEvents.emit[isLike ? 'LIKE_TWEET' : 'DISLIKE_TWEET'],
                {
                    tweetId,
                    userId: _id,
                    tweetOwner: tweet.user._id,
                },
            );

            return res.sendStatus(200);
        } catch (error) {
            next(error);
        }
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

    addReporter: async (req, res, next) => {
        const { _id } = req.body;
        const tweetId = req.params.tweet_id;

        try {
            await tweetService.addReporter(_id, tweetId);

            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    },

    removeReporter: async (req, res, next) => {
        const { _id } = req.body;
        const tweetId = req.params.tweet_id;

        try {
            await tweetService.removeReporter(_id, tweetId);

            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    },

    addViewer: async (req, res, next) => {
        const { _id } = req.body;
        const tweetId = req.params.tweet_id;

        try {
            await tweetService.addViewer(_id, tweetId);

            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    },

    delete: async (req, res, next) => {
        const { _id } = req.body;
        const tweetId = req.params.tweet_id;

        try {
            if (!tweetId) throw createError(400, 'Tweet id is required');

            const tweet = await tweetService.delete(_id, tweetId);

            notificationService.deleteByTweetId(tweetId).then(() => {
                console.log('~~~ deleteByTweetId ok');
            });

            global.socketIo.emit(socketEvents.emit.DELETE_TWEET, {
                tweetId,
                tweetOwner: tweet.user._id,
            });

            res.json(tweet);
        } catch (error) {
            next(error);
        }
    },
};
