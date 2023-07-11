const TweetModel = require('../models/tweetModel');

module.exports = {
    count: async (req, res, next) => {
        const _id = req.body._id;

        try {
            const result = await TweetModel.find({
                user: _id,
            }).count();

            res.json(result);
        } catch (error) {
            res.sendStatus(400);
        }
    },

    getMyTweets: async (req, res, next) => {
        const _id = req.body._id;
        const limit = req.query.limit || 8;
        const skip = req.query.skip || 0;

        try {
            const myTweets = await TweetModel.find({
                user: _id,
            })
                .skip(skip)
                .limit(limit)
                .sort({
                    createdAt: -1,
                });

            res.json(myTweets);
        } catch (error) {
            console.log('🚀 ~ getMyTweet: ~ error:', error);
            res.sendStatus(400);
        }
    },

    createTweet: async (req, res) => {
        const { _id, content, images, videos, group } = req.body;

        if (![content, images, videos].some(Boolean))
            return res.sendStatus(400);

        try {
            const tweet = new TweetModel({
                content,
                images,
                likes: [],
                user: _id,
                videos,
                group,
            });

            const result = await tweet.save();
            res.json(result);
        } catch (error) {
            console.error('🚀 ~ createTweet: ~ error:', error);
            res.sendStatus(400);
        }
    },
};
