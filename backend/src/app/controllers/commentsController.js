const { default: mongoose } = require('mongoose');
const CommentModel = require('../models/commentModel');
const TweetModel = require('../models/tweetModel');
const errors = require('../../utils/errors');

module.exports = {
    // ENDPOINT: /api/private/comments
    getAll: async (req, res, next) => {
        try {
            const tweetId = req.params.tweet_id;
            const limit = req.params.limit ?? 10;
            const skip = req.params.skip ?? 0;

            const comments = await CommentModel.find({
                post: new mongoose.Types.ObjectId(tweetId),
                deleted: false,
            })
                .skip(+skip)
                .limit(+limit);

            res.json(comments);
        } catch (error) {
            next(error);
        }
    },

    post: async (res, req, next) => {
        try {
            const tweetId = res.params.tweet_id;

            const tweet = await TweetModel.findById(tweetId);

            if (!tweet)
                return req.status(404).json(errors[404]("Tweet wasn't found"));

            const {
                _id,
                user: { name, avatar, username },
                content,
                parent,
            } = res.body;

            const comment = new CommentModel({
                post: tweetId,
                user: { _id, name, avatar, username },
                content,
                likes: [],
                parent,
            });

            const result = await comment.save();

            req.status(201).json(result);
        } catch (error) {
            next(error);
        }
    },

    put: async (res, req, next) => {
        try {
            const tweetId = res.params.tweet_id;
            const commentId = res.params.comment_id;

            const {
                _id,
                user: { name, avatar, username },
                content,
                parent,
            } = res.body;

            const comment = await CommentModel.updateOne(
                {
                    post: tweetId,
                    _id: commentId,
                },
                {
                    $set: {
                        post: tweetId,
                        user: { _id, name, avatar, username },
                        content,
                        parent,
                    },
                },
            );

            if (comment.matchedCount === 0)
                return req
                    .status(404)
                    .json(errors[404]("Comment wasn't found"));

            req.json(await CommentModel.findById(commentId));
        } catch (error) {
            next(error);
        }
    },

    patch: async (res, req, next) => {
        try {
            const tweetId = res.params.tweet_id;
            const commentId = res.params.comment_id;

            const { content } = res.body;

            const comment = await CommentModel.updateOne(
                {
                    post: tweetId,
                    _id: commentId,
                },
                {
                    $set: {
                        content,
                    },
                },
            );

            if (comment.matchedCount === 0)
                return req
                    .status(404)
                    .json(errors[404]("Comment wasn't found"));

            req.json(await CommentModel.findById(commentId));
        } catch (error) {
            next(error);
        }
    },

    delete: async (req, res, next) => {
        try {
            const commentId = req.params.comment_id;

            const comment = await CommentModel.findOneAndUpdate(
                {
                    _id: commentId,
                },
                {
                    $set: {
                        deleted: true,
                    },
                },
            );

            if (comment) res.json(comment);
            else res.status(404).json(errors[404]("Comment wasn't found"));
        } catch (error) {
            next(error);
        }
    },
};
