const tweetModel = require('../models/tweetModel');

module.exports = {
    getAll: (userId) =>
        tweetModel.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: ['$deleted', false] },
                            { $ne: ['$user._id', userId] },
                            { $not: [{ $in: [userId, '$notInterested'] }] },
                        ],
                    },
                },
            },
            {
                $group: { _id: '$user', numberOfTweets: { $sum: 1 } },
            },
            {
                $sort: {
                    numberOfTweets: -1,
                },
            },
            {
                $addFields: {
                    '_id.numberOfTweets': '$numberOfTweets',
                },
            },
            { $replaceRoot: { newRoot: '$_id' } },
        ]),
};
