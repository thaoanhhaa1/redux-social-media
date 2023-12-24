const { Schema, model, default: mongoose } = require('mongoose');
const followModel = require('./followModel');
const userModel = require('./userModel');
const { notificationType } = require('../../constants');

const NotificationSchema = new Schema(
    {
        user: {
            type: String,
            required: true,
        },
        count: {
            type: Number,
            default: 1,
        },
        notifications: {
            default: [],
            type: [
                {
                    _id: {
                        type: Number,
                    },
                    user: {
                        type: {
                            _id: {
                                type: String,
                                required: true,
                            },
                            name: {
                                type: String,
                            },
                            username: {
                                type: String,
                                required: true,
                            },
                            avatar: {
                                type: String,
                            },
                        },
                        required: true,
                    },
                    document: {
                        type: String,
                    },
                    group: {
                        type: {
                            _id: {
                                type: String,
                                required: true,
                            },
                        },
                    },
                    type: {
                        type: String,
                        enum: [
                            notificationType.ADD_STORY,
                            notificationType.BIRTHDAY,
                            notificationType.LIKE_COMMENT,
                            notificationType.LIKE_TWEET,
                            notificationType.POST_COMMENT,
                            notificationType.POST_TWEET,
                        ],
                        required: true,
                    },
                    description: {
                        type: String,
                    },
                    createdAt: {
                        type: Date,
                        required: true,
                    },
                    deleted: {
                        type: Boolean,
                        default: false,
                    },
                },
            ],
        },
    },
    {
        timestamps: true,
    },
);

// Queries
NotificationSchema.statics.insertNotification = function (_id, notifications) {
    const date = new Date();

    return this.findOneAndUpdate(
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
};

NotificationSchema.statics.insertToFollowers = async function (
    _id,
    notification,
) {
    const [follow, user] = await Promise.all([
        followModel.getFollower(_id),
        userModel.getUserDTO(_id),
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
};

NotificationSchema.statics.getMyNotifications = function (_id, page) {
    const regex = new RegExp(`^${_id}_`);

    return this.aggregate([
        { $match: { user: regex } },
        { $sort: { createdAt: -1, updatedAt: -1 } },
        { $unwind: '$notifications' },
        { $replaceRoot: { newRoot: '$notifications' } },
        { $match: { deleted: false } },
        { $sort: { createdAt: -1 } },
        { $skip: (page - 1) * 10 },
        { $limit: 10 },
    ]);
};

NotificationSchema.statics.countPages = function (_id) {
    const regex = new RegExp(`^${_id}_`);

    return this.find({
        user: regex,
    }).count();
};

NotificationSchema.statics.deleteNotificationItem = function (
    userId,
    notificationId,
) {
    const regex = new RegExp(`^${userId}_`);

    return this.updateMany(
        { user: regex },
        { $set: { 'notifications.$[element].deleted': true } },
        { arrayFilters: [{ 'element._id': notificationId }] },
    );
};

NotificationSchema.statics.dislikeTweet = async function (userId, tweetId) {
    const follow = await followModel.getFollower(userId);

    const followers = follow.followers;

    const length = followers.length;
    const queries = [];

    for (let index = 0; index < length; index++) {
        const follower = followers[index];

        queries.push(
            this.updateMany(
                {
                    user: new RegExp(`^${follower}_`),
                },
                { $set: { 'notifications.$[element].deleted': true } },
                {
                    arrayFilters: [
                        {
                            $and: [
                                { 'element.user._id': userId },
                                { 'element.type': notificationType.LIKE_TWEET },
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
};

module.exports = model('notifications', NotificationSchema);
