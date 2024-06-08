const commentModel = require('../models/commentModel');

module.exports = {
    incNumberOfComments: (_id) =>
        commentModel.updateOne(
            {
                _id,
            },
            {
                $inc: {
                    numberOfComments: 1,
                },
            },
        ),

    decNumberOfComments: (_id) =>
        commentModel.updateOne(
            {
                _id,
            },
            {
                $inc: {
                    numberOfComments: -1,
                },
            },
        ),

    getAll: (post, skip = 0, limit = 10) =>
        commentModel
            .find({
                $and: [
                    {
                        post,
                    },
                    {
                        deleted: false,
                    },
                    {
                        $or: [
                            {
                                parent: { $exists: false },
                            },
                            {
                                parent: null,
                            },
                        ],
                    },
                ],
            })
            .skip(skip)
            .limit(limit)
            .sort({
                createdAt: -1,
            }),

    getAllByParent: (parent) =>
        commentModel
            .find({
                $and: [
                    {
                        parent,
                    },
                    {
                        deleted: false,
                    },
                ],
            })
            .sort({
                createdAt: 1,
            }),
    put: (_id, post, user, content, parent) =>
        commentModel.updateOne(
            {
                post,
                _id,
            },
            {
                $set: {
                    user,
                    content,
                    parent,
                },
            },
        ),

    patch: (_id, post, content) =>
        commentModel.updateOne(
            {
                post,
                _id,
            },
            {
                $set: {
                    content,
                },
            },
        ),

    softDelete: (_id) =>
        commentModel.findOneAndUpdate(
            {
                _id,
            },
            {
                $set: {
                    deleted: true,
                },
            },
        ),

    toggleLike: (_id, isLike, userId) => {
        const update = {
            [isLike ? '$addToSet' : '$pull']: {
                likes: userId,
            },
            $inc: {
                numberOfLikes: isLike ? 1 : -1,
            },
        };

        return commentModel.updateOne({ _id }, update);
    },

    findById: (_id) => commentModel.findById({ _id }),
};
