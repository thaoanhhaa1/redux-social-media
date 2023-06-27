const TweetModel = require("../models/tweetModel")

module.exports = {
    count: async (req, res, next) => {
        const _id = req.body._id

        try {
            const result = await TweetModel.find({
                user: _id
            }).count()

            res.json(result)
        } catch (error) {
            res.sendStatus(400)
        }
    },

    getMyTweets: async (req, res, next) => {
        const _id = req.body._id;
        const limit = req.query.limit || 8
        const skip = req.query.skip || 0

        try {
            const myTweets = await TweetModel.find({
                user: _id
            }).skip(skip).limit(limit)

            res.json(myTweets)
        } catch (error) {
            console.log("🚀 ~ getMyTweet: ~ error:", error)
            res.sendStatus(400)
        }
    }
}