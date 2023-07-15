const FollowModel = require('../models/followModel');
const TweetModel = require('../models/tweetModel');

module.exports = {
    count: async (req, res) => {
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

    getMyTweets: async (req, res) => {
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

    getFollowingTweets: async (req, res) => {
        const { _id } = req.body;

        try {
            const tweets = await FollowModel.aggregate([
                { $match: { user: _id } },
                { $unwind: '$following' },
                { $project: { _id: 0, user: 0, followers: 0, __v: 0 } },
                {
                    $lookup: {
                        from: 'users',
                        as: 'user',
                        let: { id: '$following' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: [{ $toString: '$_id' }, '$$id'],
                                    },
                                },
                            },
                            { $project: { username: 1, name: 1, avatar: 1 } },
                        ],
                    },
                },
                { $unwind: '$user' },
                { $project: { following: 0 } },
                {
                    $lookup: {
                        from: 'tweets',
                        as: 'tweets',
                        let: { userId: { $toString: '$user._id' } },
                        pipeline: [
                            {
                                $match: {
                                    $expr: { $eq: ['$user', '$$userId'] },
                                },
                            },
                        ],
                    },
                },
                { $match: { $expr: { $gt: [{ $size: '$tweets' }, 0] } } },
            ]);

            res.json(tweets);
        } catch (error) {
            res.sendStatus(400);
        }
    },

    toggleLike: async (req, res) => {
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
            console.error('🚀 ~ toggleLike: ~ error:', error);
        }
        res.sendStatus(400);
    },
};
