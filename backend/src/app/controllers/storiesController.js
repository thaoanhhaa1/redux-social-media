const StoryModel = require('../models/storyModel');
const FollowModel = require('../models/followModel');

module.exports = {
    getStories: async (req, res, next) => {
        const _id = req.body._id;

        try {
            const following = await FollowModel.getFollowing(_id);
            const stories = await StoryModel.getStories(_id, following);

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

            const storyCreated = await story.save();
            res.json(storyCreated);
        } catch (error) {
            next(error);
        }
    },
};
