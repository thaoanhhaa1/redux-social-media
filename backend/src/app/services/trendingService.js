const TrendingDetailModel = require('../models/trendingDetailModel');
const TrendingModel = require('../models/trendingModel');
const tweetModel = require('../models/tweetModel');

const NUMBER_OF_PAGE = 10;

module.exports = {
    analyzeTweets: async () => {
        try {
            const trendingOld = await TrendingModel.findOne(
                {
                    type: 'tweet',
                },
                {},
                { sort: { updatedAt: -1 } },
            );

            const filter = {};

            if (trendingOld) filter.createdAt = { $gte: trendingOld.updatedAt };

            const tweets = await tweetModel.find(filter);

            const trending = tweets.reduce((acc, tweet) => {
                const hashtags = tweet.content.match(/#[^\s]+/g) || [];
                const hashtagsSet = new Set(
                    hashtags.map((hashtag) =>
                        hashtag.substring(1).toLowerCase(),
                    ),
                );

                hashtagsSet.forEach((hashtag) => {
                    if (acc[hashtag])
                        acc[hashtag] = {
                            quantity: acc[hashtag].quantity + 1,
                            tweetIds: [...acc[hashtag].tweetIds, tweet._id],
                        };
                    else
                        acc[hashtag] = {
                            quantity: 1,
                            tweetIds: [tweet._id],
                        };
                });

                return acc;
            }, {});

            await Promise.all(
                Object.entries(trending).map(([hashtag, { quantity }]) =>
                    TrendingModel.updateOne(
                        { _id: hashtag, type: 'tweet' },
                        {
                            $inc: { quantity },
                        },
                        { upsert: true },
                    ),
                ),
            );

            await Promise.all(
                Object.entries(trending).map(([hashtag, { tweetIds }]) =>
                    TrendingDetailModel.updateOne(
                        { _id: hashtag },
                        {
                            $addToSet: { documentIds: { $each: tweetIds } },
                        },
                        { upsert: true },
                    ),
                ),
            );
        } catch (error) {
            console.error('Error during analyze tweets:', error);
        }
    },

    getTrending: async ({ type, page }) => {
        try {
            const trending = await TrendingModel.find(
                {
                    type,
                },
                {},
                {
                    sort: { quantity: -1 },
                    limit: NUMBER_OF_PAGE,
                    skip: (page - 1) * NUMBER_OF_PAGE,
                },
            );

            return trending;
        } catch (error) {
            throw error;
        }
    },

    countPages: async ({ type }) => {
        try {
            const count = await TrendingModel.countDocuments({ type });

            return Math.ceil(count / NUMBER_OF_PAGE);
        } catch (error) {
            throw error;
        }
    },
};
