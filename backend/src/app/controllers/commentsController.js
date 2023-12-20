const { default: mongoose } = require('mongoose');
const CommentModel = require('../models/commentModel');
const TweetModel = require('../models/tweetModel');
const errors = require('../../utils/errors');

const decNumberOfComments = (Model, _id) =>
    Model.updateOne(
        {
            _id,
        },
        {
            $inc: {
                numberOfComments: -1,
            },
        },
    );

module.exports = {
    // ENDPOINT: /api/private/comments
    getAll: async (req, res, next) => {
        try {
            const tweetId = req.params.tweet_id;
            const limit = req.params.limit ?? 10;
            const skip = req.params.skip ?? 0;

            const comments = await CommentModel.find({
                $and: [
                    {
                        post: new mongoose.Types.ObjectId(tweetId),
                    },
                    {
                        deleted: false,
                    },
                    {
                        $or: [
                            {
                                parent: { $exists: false },
                            },
                            {
                                parent: null,
                            },
                        ],
                    },
                    {
                        post: tweetId,
                    },
                ],
            })
                .skip(+skip)
                .limit(+limit)
                .sort({
                    numberOfComments: -1,
                    numberOfLikes: -1,
                    createdAt: -1,
                });

            res.json(comments);
        } catch (error) {
            next(error);
        }
    },

    getAllByParent: async (req, res, next) => {
        try {
            const commentId = req.params.comment_id;

            const comments = await CommentModel.find({
                $and: [
                    {
                        parent: commentId,
                    },
                    {
                        deleted: false,
                    },
                ],
            }).sort({
                createdAt: 1,
            });

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

            if (comment.parent)
                await CommentModel.updateOne(
                    {
                        _id: new mongoose.Types.ObjectId(comment.parent),
                    },
                    {
                        $inc: {
                            numberOfComments: 1,
                        },
                    },
                );
            else
                await TweetModel.updateOne(
                    {
                        _id: new mongoose.Types.ObjectId(tweetId),
                    },
                    {
                        [tweet.numberOfComments ? '$inc' : '$set']: {
                            numberOfComments: 1,
                        },
                    },
                );

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
            const tweetId = req.params.tweet_id;

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

            if (comment.parent) {
                await decNumberOfComments(CommentModel, comment.parent);
            } else await decNumberOfComments(TweetModel, tweetId);

            if (comment) res.json(comment);
            else res.status(404).json(errors[404]("Comment wasn't found"));
        } catch (error) {
            next(error);
        }
    },

    toggleLike: async (req, res, next) => {
        const commentId = req.params.comment_id;
        const isLike = req.body.isLike;
        const _id = req.body._id;

        try {
            const update = {
                [isLike ? '$addToSet' : '$pull']: {
                    likes: _id,
                },
                $inc: {
                    numberOfLikes: isLike ? 1 : -1,
                },
            };

            const updateResult = await CommentModel.updateOne(
                { _id: commentId },
                update,
            );

            if (!updateResult.matchedCount)
                return res.status(404).json(errors[404]("Comment was't found"));

            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    },
};
