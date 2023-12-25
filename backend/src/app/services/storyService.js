const storyModel = require('../models/storyModel');

module.exports = {
    getStories: function (_id, following) {
        return storyModel.aggregate([
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
    },
};
