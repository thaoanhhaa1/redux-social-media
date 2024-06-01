const { Types } = require('mongoose');
const CommentModel = require('../models/commentModel');
const TweetModel = require('../models/tweetModel');
const { errors } = require('../../utils');
const {
    commentService,
    tweetService,
    notificationService,
    userService,
} = require('../services');
const { notificationType } = require('../../constants');

module.exports = {
    // ENDPOINT: /api/private/comments
    getAll: async (req, res, next) => {
        try {
            const tweetId = req.params.tweet_id;
            const limit = +(req.query.limit ?? 10);
            const skip = +(req.query.skip ?? 0);

            const comments = await commentService.getAll(tweetId, skip, limit);

            res.json(comments);
        } catch (error) {
            next(error);
        }
    },

    getAllByParent: async (req, res, next) => {
        try {
            const commentId = req.params.comment_id;

            const comments = await commentService.getAllByParent(commentId);

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

            // Inc number of comments
            if (comment.parent)
                commentService
                    .incNumberOfComments(new Types.ObjectId(comment.parent))
                    .then();
            else {
                tweetService
                    .incNumberOfComments(new Types.ObjectId(tweetId))
                    .then();
            }

            // Add notification
            const notification = {
                user: { _id, name, avatar, username },
                document: result._id,
                type: notificationType.POST_COMMENT,
                description: content,
                tweetUsername: tweet.user.username,
                tweetId: tweet._id,
            };

            tweetService
                .getNotInterestedById(tweet._id)
                .then((notInterested) => {
                    const queries = [];

                    // - Tweet
                    if (
                        _id !== tweet.user._id &&
                        !notInterested.includes(tweet.user._id)
                    )
                        queries.push(
                            notificationService.insertNotification(
                                tweet.user._id,
                                notification,
                            ),
                        );

                    // - Comment
                    if (comment.parent)
                        queries.push(
                            commentService
                                .findById(comment.parent)
                                .then(
                                    (comment) =>
                                        comment.user._id === _id ||
                                        notInterested.includes(
                                            comment.user._id,
                                        ) ||
                                        notificationService.insertNotification(
                                            comment.user._id,
                                            notification,
                                        ),
                                ),
                        );

                    return Promise.all(queries);
                })
                .then(() =>
                    console.log('~~~ NOTIFICATION - POST COMMENT ==> OK'),
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

            const comment = await commentService.put(
                commentId,
                tweetId,
                { _id, name, avatar, username },
                content,
                parent,
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

            const comment = await commentService.patch(
                commentId,
                tweetId,
                content,
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

            const comment = await commentService.softDelete(commentId);

            if (comment.parent) {
                commentService.decNumberOfComments(comment.parent).then();
            } else tweetService.decNumberOfComments(tweetId).then();

            // Notification
            if (comment) {
                notificationService
                    .deleteComment(commentId)
                    .then(() =>
                        console.log('~~~ NOTIFY - DELETE COMMENT - OK'),
                    );

                return res.json(comment);
            }

            res.status(404).json(errors[404]("Comment wasn't found"));
        } catch (error) {
            next(error);
        }
    },

    toggleLike: async (req, res, next) => {
        const commentId = req.params.comment_id;
        const { _id, isLike } = req.body;

        try {
            const updateResult = await commentService.toggleLike(
                commentId,
                isLike,
                _id,
            );

            if (!updateResult.matchedCount)
                return res.status(404).json(errors[404]("Comment was't found"));

            // Notification
            if (isLike) {
                commentService
                    .findById(commentId)
                    .then((comment) =>
                        Promise.all([
                            commentService.findById(commentId),
                            userService.findDTOById(_id),
                            tweetService.getNotInterestedById(comment.post),
                        ]),
                    )
                    .then(
                        ([comment, user, notInterested]) =>
                            comment.user._id === _id ||
                            notInterested.includes(comment.user._id) ||
                            notificationService.insertNotification(
                                comment.user._id,
                                {
                                    user: user,
                                    document: commentId,
                                    type: notificationType.LIKE_COMMENT,
                                    description: comment.content,
                                    tweetUsername: tweet.user.username,
                                    tweetId: comment.post,
                                },
                            ),
                    )
                    .then(() =>
                        console.log('~~~ NOTIFY - LIKE COMMENT --> OK'),
                    );
            } else {
                notificationService
                    .dislikeComment(_id, commentId)
                    .then(() =>
                        console.log('~~~ NOTIFY - DISLIKE COMMENT --> OK'),
                    );
            }

            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    },
};
