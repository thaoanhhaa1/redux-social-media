const { Schema, model } = require('mongoose');
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
                    tweetId: {
                        type: String,
                    },
                    tweetUsername: {
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

module.exports = model('notifications', NotificationSchema);
