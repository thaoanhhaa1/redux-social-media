const followService = require('./followService');
const { notificationType } = require('../../constants');
const commentModel = require('../models/commentModel');
const notificationModel = require('../models/notificationModel');
const userService = require('./userService');

const deleteByCommentId = (commentId) =>
    notificationModel.updateMany(
        {},
        { $set: { 'notifications.$[element].deleted': true } },
        {
            arrayFilters: [
                {
                    $and: [
                        { 'element.document': commentId },
                        { 'element.deleted': false },
                    ],
                },
            ],
        },
    );

module.exports = {
    dislikeComment: (userId, commentId) =>
        notificationModel.updateMany(
            {},
            { $set: { 'notifications.$[element].deleted': true } },
            {
                arrayFilters: [
                    {
                        $and: [
                            { 'element.user._id': userId },
                            { 'element.type': notificationType.LIKE_COMMENT },
                            { 'element.document': commentId },
                            { 'element.deleted': false },
                        ],
                    },
                ],
            },
        ),

    deleteNotificationOfUserIdByUserId: async ({ userId, otherUserId }) => {
        const regex = new RegExp(`^${userId}_`);

        return notificationModel.updateMany(
            { user: regex },
            { $set: { 'notifications.$[element].deleted': true } },
            {
                arrayFilters: [{ 'element.user._id': otherUserId }],
            },
        );
    },

    deleteComment: async function (commentId) {
        const queries = [];

        const deleteComment = async (id) => {
            return this.deleteComment(id);
        };

        queries.push(deleteByCommentId(commentId));

        const comments = await commentModel.find(
            { parent: commentId },
            { _id: 1 },
        );

        queries.push(...comments.map((comment) => deleteComment(comment._id)));

        return Promise.all(queries);
    },

    insertNotification: async function (_id, notifications) {
        const date = new Date();

        const notification = await notificationModel.findOneAndUpdate(
            {
                user: new RegExp(`^${_id}_`),
                count: { $lt: 10 },
            },
            {
                $push: {
                    notifications: {
                        _id: date.getTime(),
                        createdAt: date,
                        ...notifications,
                    },
                },
                $inc: {
                    count: 1,
                },
                $setOnInsert: {
                    user: `${_id}_${new Date().getTime()}`,
                },
            },
            {
                new: true,
                upsert: true,
            },
        );

        return notification.notifications[
            notification.notifications.length - 1
        ];
    },

    insertToFollowers: async function (_id, notification) {
        const [follow, user] = await Promise.all([
            followService.getFollower(_id),
            userService.getUserDTO(_id),
        ]);

        const follower = follow.followers;

        const notifications = follower.map((_id) =>
            this.insertNotification(_id, {
                user,
                createdAt: new Date(),
                _id: new Date().getTime(),
                ...notification,
            }),
        );

        return Promise.all(notifications);
    },

    getMyNotifications: function (_id, skip = 0) {
        const regex = new RegExp(`^${_id}_`);

        return notificationModel.aggregate([
            { $match: { user: regex } },
            { $sort: { createdAt: -1, updatedAt: -1 } },
            { $unwind: '$notifications' },
            { $replaceRoot: { newRoot: '$notifications' } },
            { $match: { deleted: false } },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: 10 },
        ]);
    },

    findById: function (_id, notificationId) {
        const regex = new RegExp(`^${_id}_`);

        return notificationModel.aggregate([
            { $match: { user: regex } },
            { $unwind: '$notifications' },
            { $replaceRoot: { newRoot: '$notifications' } },
            { $match: { _id: notificationId } },
        ]);
    },

    countPages: async function (_id) {
        const regex = new RegExp(`^${_id}_`);

        const count = await notificationModel.aggregate([
            { $match: { user: regex } },
            { $unwind: '$notifications' },
            { $replaceRoot: { newRoot: '$notifications' } },
            { $match: { deleted: false } },
            { $count: 'count' },
        ]);

        return Math.ceil(count[0]?.count || 0 / 10);
    },

    deleteNotificationItem: function (userId, notificationId) {
        const regex = new RegExp(`^${userId}_`);

        return notificationModel.updateMany(
            { user: regex },
            { $set: { 'notifications.$[element].deleted': true } },
            { arrayFilters: [{ 'element._id': notificationId }] },
        );
    },

    likeTweet: async function (_id, tweetOwnerId, notification) {
        const user = await userService.getUserDTO(_id);

        return this.insertNotification(tweetOwnerId, {
            user,
            ...notification,
        });
    },

    dislikeTweet: async function (userId, tweetId) {
        const follow = await followService.getFollower(userId);

        const followers = follow.followers;

        const length = followers.length;
        const queries = [];

        for (let index = 0; index < length; index++) {
            const follower = followers[index];

            queries.push(
                notificationModel.updateMany(
                    {
                        user: new RegExp(`^${follower}_`),
                    },
                    { $set: { 'notifications.$[element].deleted': true } },
                    {
                        arrayFilters: [
                            {
                                $and: [
                                    { 'element.user._id': userId },
                                    {
                                        'element.type':
                                            notificationType.LIKE_TWEET,
                                    },
                                    { 'element.document': tweetId },
                                    { 'element.deleted': false },
                                ],
                            },
                        ],
                    },
                ),
            );
        }

        return Promise.all(queries);
    },

    deleteTweetAndRelationByUserId: async (userId, tweetId) => {
        const queries = [];
        const regex = new RegExp(`^${userId}_`);

        // Tweet: post
        queries.push(
            notificationModel.updateMany(
                { user: regex },
                { $set: { 'notifications.$[element].deleted': true } },
                {
                    arrayFilters: [
                        {
                            $and: [
                                { 'element.document': tweetId },
                                { 'element.deleted': false },
                            ],
                        },
                    ],
                },
            ),
        );

        // Comments
        const comments = await commentModel.find(
            { post: tweetId, deleted: false },
            { _id: 1 },
        );

        const commentIds = comments.map((comment) => comment._id);

        queries.push(
            notificationModel.updateMany(
                { user: regex },
                { $set: { 'notifications.$[element].deleted': true } },
                {
                    arrayFilters: [
                        {
                            $and: [
                                { 'element.document': { $in: commentIds } },
                                { 'element.deleted': false },
                            ],
                        },
                    ],
                },
            ),
        );

        return Promise.all(queries);
    },
};
