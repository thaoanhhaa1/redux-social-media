const {
    Types: { ObjectId },
} = require('mongoose');
const CommentModel = require('../models/commentModel');
const TweetModel = require('../models/tweetModel');
const { errors } = require('../../utils');
const {
    commentService,
    tweetService,
    notificationService,
    userService,
} = require('../services');
const { notificationType, socketEvents } = require('../../constants');

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
                    .incNumberOfComments(new ObjectId(comment.parent))
                    .then();
            else tweetService.incNumberOfComments(new ObjectId(tweetId)).then();

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
                    // - Tweet
                    if (
                        _id !== tweet.user._id &&
                        !notInterested.includes(tweet.user._id) &&
                        !comment.parent
                    )
                        return notificationService
                            .insertNotification(tweet.user._id, notification)
                            .then((data) => ({
                                ...data.toObject(),
                                to: tweet.user._id,
                            }));

                    // - Comment
                    if (comment.parent) {
                        let parentCommentUserId;
                        return commentService
                            .findById(comment.parent)
                            .then((comment) => {
                                parentCommentUserId = comment.user._id;
                                return (
                                    parentCommentUserId === _id ||
                                    notInterested.includes(
                                        parentCommentUserId,
                                    ) ||
                                    notificationService.insertNotification(
                                        parentCommentUserId,
                                        notification,
                                    )
                                );
                            })
                            .then((data) => {
                                return typeof data === 'object'
                                    ? {
                                          ...data.toObject(),
                                          to: parentCommentUserId,
                                      }
                                    : Promise.resolve();
                            });
                    }

                    return Promise.resolve();
                })
                .then((notification) => {
                    console.log('~~~ NOTIFICATION - POST COMMENT ==> OK');

                    if (!notification) return;

                    global.socketIo
                        .in(notification.to)
                        .emit(socketEvents.emit.NOTIFICATION, notification);
                });

            global.socketIo.emit(socketEvents.emit.COMMENT_TWEET, {
                comment: result,
                tweetOwner: tweet.user._id,
            });
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
            const [updateResult, comment] = await Promise.all([
                commentService.toggleLike(commentId, isLike, _id),
                commentService.findById(commentId),
            ]);

            if (!updateResult.matchedCount || !comment)
                return res.status(404).json(errors[404]("Comment was't found"));

            // Notification
            if (isLike) {
                Promise.all([
                    commentService.findById(commentId),
                    userService.findDTOById(_id),
                    tweetService.findById(comment.post),
                ])
                    .then(
                        ([comment, user, tweet]) =>
                            comment.user._id === _id ||
                            tweet.notInterested.includes(comment.user._id) ||
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
                    .then((data) => {
                        console.log('~~~ NOTIFY - LIKE COMMENT --> OK');

                        if (typeof data !== 'object') return;

                        global.socketIo
                            .in(comment.user._id)
                            .emit(socketEvents.emit.NOTIFICATION, data);
                    })
                    .catch((error) => {
                        console.error('~~~ NOTIFY - LIKE COMMENT --> ERROR');
                        console.error(error);
                    });
            } else {
                notificationService
                    .dislikeComment(_id, commentId)
                    .then(() =>
                        console.log('~~~ NOTIFY - DISLIKE COMMENT --> OK'),
                    );
            }

            tweetService.findById(comment.post).then((tweet) =>
                global.socketIo.emit(
                    socketEvents.emit[
                        isLike ? 'LIKE_COMMENT' : 'DISLIKE_COMMENT'
                    ],
                    {
                        commentId,
                        userId: _id,
                        tweetId: comment.post,
                        tweetOwner: tweet.user._id,
                    },
                ),
            );

            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    },
};
