const followModel = require('../models/followModel');
const tweetModel = require('../models/tweetModel');

module.exports = {
    // FIXME
    getAll: async (userId) => {
        const follow = await followModel.findOne({
            user: userId,
        });

        const blocked = follow ? [...follow.blocks, ...follow.beenBlocks] : [];
        const following = follow ? follow.following : [];

        return tweetModel.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: ['$deleted', false] },
                            { $ne: ['$user._id', userId] },
                            { $not: [{ $in: [userId, '$notInterested'] }] },
                            { $not: [{ $in: ['$user._id', blocked] }] },
                            { $in: ['$user._id', following] },
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
