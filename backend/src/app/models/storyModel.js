const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StoryModel = new Schema(
    {
        user: {
            type: String,
            required: true,
        },
        story: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

StoryModel.statics.getStories = function (_id, following) {
    return this.aggregate([
        {
            $match: {
                $expr: {
                    $and: [
                        {
                            $gte: [
                                '$createdAt',
                                {
                                    $dateSubtract: {
                                        startDate: '$$NOW',
                                        unit: 'day',
                                        amount: 1,
                                    },
                                },
                            ],
                        },
                        {
                            $or: [
                                {
                                    $eq: ['$user', _id],
                                },
                                {
                                    $in: ['$user', following],
                                },
                            ],
                        },
                    ],
                },
            },
        },
    ]);
};

module.exports = mongoose.model('story', StoryModel);
