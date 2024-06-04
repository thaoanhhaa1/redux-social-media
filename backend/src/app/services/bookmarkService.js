const followModel = require('../models/followModel');
const tweetModel = require('../models/tweetModel');

module.exports = {
    // FIXME
    getAll: async (userId) => {
        const follow = await followModel.findOne({
            user: userId,
        });

        const blocked = follow ? [...follow.blocks, ...follow.beenBlocks] : [];

        return tweetModel.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: ['$deleted', false] },
                            { $ne: ['$user._id', userId] },
                            { $not: [{ $in: [userId, '$notInterested'] }] },
                            { $not: [{ $in: ['$user._id', blocked] }] },
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
        ]);
    },
};
