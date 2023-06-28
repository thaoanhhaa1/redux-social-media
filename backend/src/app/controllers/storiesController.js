const StoryModel = require('../models/storyModel')

module.exports = {
    getMyStories: async (req, res, next) => {
        const _id = req.body._id

        try {
            const stories = await StoryModel.find({
                user: _id
            })

            res.json(stories)
        } catch (error) {
            console.log("🚀 ~ getMyStories: ~ error:", error)
            res.sendStatus(400)
        }
    }
}