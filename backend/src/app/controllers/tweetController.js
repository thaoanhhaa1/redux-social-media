const FollowModel = require('../models/followModel');
const TweetModel = require('../models/tweetModel');
const NotificationModel = require('../models/notificationModel');
const { notificationType } = require('../../constants');

module.exports = {
    count: async (req, res, next) => {
        const _id = req.body._id;

        try {
            const result = await TweetModel.countTweetsByUserId(_id);

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
            const myTweets = await TweetModel.getMyTweets(_id, skip, limit);

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

            NotificationModel.insertToFollowers(_id, {
                document: result._id,
                type: notificationType.POST_TWEET,
            }).then(() => console.log('~~~ insertToFollowers ok'));

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

            const tweets = await TweetModel.getFollowingTweets(_id, following);

            res.json(tweets);
        } catch (error) {
            next(error);
        }
    },

    toggleLike: async (req, res, next) => {
        const { _id, tweetId, isLike } = req.body;

        try {
            const [result, tweet] = await Promise.all([
                TweetModel.toggleLike(_id, tweetId, isLike),
                TweetModel.findOne({ _id: tweetId }),
            ]);

            if (result.modifiedCount > 0) {
                if (isLike)
                    NotificationModel.insertToFollowers(_id, {
                        document: tweetId,
                        type: notificationType.LIKE_TWEET,
                        description: tweet?.content,
                    }).then(() => console.log('~~~ insertToFollowers ok'));
                else
                    NotificationModel.dislikeTweet(_id, tweetId).then(() =>
                        console.log('~~~ dislikeTweet ok'),
                    );

                return res.sendStatus(200);
            }
        } catch (error) {
            next(error);
            return;
        }

        next(new Error());
    },
};
