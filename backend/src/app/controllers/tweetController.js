const FollowModel = require('../models/followModel');
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
            next(error);
        }
    },

    getMyTweets: async (req, res, next) => {
        const _id = req.body._id;
        const limit = +req.query.limit || 8;
        const skip = +req.query.skip || 0;

        try {
            const myTweets = await TweetModel.aggregate([
                { $match: { user: _id } },
                { $sort: { createdAt: -1 } },
                { $skip: skip },
                { $limit: limit },
                {
                    $lookup: {
                        from: 'locations',
                        as: 'location',
                        let: { location: '$location' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: [
                                            { $toString: '$_id' },
                                            '$$location',
                                        ],
                                    },
                                },
                            },
                        ],
                    },
                },
                {
                    $addFields: {
                        location: {
                            $ifNull: [{ $arrayElemAt: ['$location', 0] }, null],
                        },
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        as: 'tagPeople',
                        let: { tagPeople: '$tagPeople' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $in: [
                                            { $toString: '$_id' },
                                            { $ifNull: ['$$tagPeople', []] },
                                        ],
                                    },
                                },
                            },
                            {
                                $project: {
                                    name: 1,
                                    username: 1,
                                    avatar: 1,
                                },
                            },
                        ],
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
            _id,
            content,
            images,
            videos,
            group,
            feeling,
            location,
            tagPeople,
            gif,
        } = req.body;

        if (
            ![content, images, videos, feeling, location, tagPeople, gif].some(
                Boolean,
            )
        )
            return next(new Error());

        try {
            const tweet = new TweetModel({
                content,
                images,
                likes: [],
                user: _id,
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
                {
                    $lookup: {
                        from: 'lists',
                        as: 'user.isInList',
                        let: {
                            userId: { $toString: '$user._id' },
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$_id', _id] },
                                            { $in: ['$$userId', '$list'] },
                                        ],
                                    },
                                },
                            },
                        ],
                    },
                },
                {
                    $addFields: {
                        'user.isInList': {
                            $gt: [{ $size: '$user.isInList' }, 0],
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
