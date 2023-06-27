const FollowModel = require('../models/followModel')

module.exports = {
    countFollow: async (req, res, next) => {
        const _id = req.body._id

        try {
            const result = await FollowModel.aggregate([{
                "$match": {
                    user: _id
                }

            }, {
                "$project": {
                    _id: 0,
                    followers: {
                        "$size": "$followers"
                    },
                    following: {
                        "$size": "$following"
                    }
                }
            }])

            if (result.length === 0)
                res.json([0, 0])
            else {
                const {
                    followers,
                    following
                } = result[0]
                res.json([followers, following])
            }
        } catch (error) {
            console.log("🚀 ~ countFollow: ~ error:", error)
            res.sendStatus(400)
        }
    },

    whoToFollow: async (req, res, next) => {
        const _id = req.body._id
        const limit = req.query.limit || 5
        const skip = req.query.skip || 0

        try {
            const result = await FollowModel.aggregate([{
                '$match': {
                    user: _id
                }
            }, {
                '$lookup': {
                    let: {
                        followers: '$followers',
                        following: "$following"
                    },
                    pipeline: [{
                        '$match': {
                            '$expr': {
                                '$and': [{
                                    '$ne': ["$_id", _id]
                                }, {
                                    '$cond': [{
                                        '$in': ["$_id", "$$followers"]
                                    }, false, true]
                                }]
                            }
                        }
                    }, {
                        '$project': {
                            password: 0,
                            createdAt: 0,
                            deleted: 0,
                            updatedAt: 0,
                            __v: 0
                        }
                    }, {
                        '$addFields': {
                            priority: {
                                '$cond': [{
                                    '$in': ["$_id", "$$following"]
                                }, 1, 0]
                            }
                        }
                    }, {
                        '$sort': {
                            priority: -1
                        }
                    }, {
                        "$project": {
                            priority: 0
                        }
                    }],
                    as: 'users',
                    from: 'users'
                }
            }, {
                "$unwind": "$users"
            }, {
                "$replaceWith": "$users"
            }, {
                "$skip": skip
            }, {
                "$limit": limit
            }])

            res.json(result)
        } catch (error) {
            console.log("🚀 ~ whoToFollow: ~ error:", error)
            res.sendStatus(400)
        }
    }
}