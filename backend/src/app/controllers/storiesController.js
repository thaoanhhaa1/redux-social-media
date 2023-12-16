const StoryModel = require('../models/storyModel');
const FollowModel = require('../models/followModel');

module.exports = {
    getStories: async (req, res, next) => {
        const _id = req.body._id;

        try {
            const stories = await FollowModel.aggregate([
                { $match: { user: _id } },
                { $project: { followers: 0, _id: 0, __v: 0 } },
                {
                    $lookup: {
                        from: 'stories',
                        as: 'stories',
                        let: { user: '$user', following: '$following' },
                        pipeline: [
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
                                                        $eq: [
                                                            '$user',
                                                            '$$user',
                                                        ],
                                                    },
                                                    {
                                                        $in: [
                                                            '$user',
                                                            '$$following',
                                                        ],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                },
                            },
                        ],
                    },
                },
                { $unwind: '$stories' },
                { $replaceWith: '$stories' },
            ]);

            res.json(stories);
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        const { _id, url } = req.body;

        if (!url) return next(new Error());

        try {
            const story = new StoryModel({
                user: _id,
                story: url,
            });

            await story.save();
            res.json(url);
        } catch (error) {
            next(error);
        }
    },
};
