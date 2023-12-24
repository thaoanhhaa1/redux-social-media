const { notificationType } = require('../../constants');
const commentModel = require('../models/commentModel');
const notificationModel = require('../models/notificationModel');

const deleteByCommentId = (commentId) =>
    notificationModel.updateMany(
        {},
        { $set: { 'notifications.$[element].deleted': true } },
        {
            arrayFilters: [
                {
                    $and: [
                        { 'element.document': commentId },
                        { 'element.deleted': false },
                    ],
                },
            ],
        },
    );

module.exports = {
    dislikeComment: (userId, commentId) =>
        notificationModel.updateMany(
            {},
            { $set: { 'notifications.$[element].deleted': true } },
            {
                arrayFilters: [
                    {
                        $and: [
                            { 'element.user._id': userId },
                            { 'element.type': notificationType.LIKE_COMMENT },
                            { 'element.document': commentId },
                            { 'element.deleted': false },
                        ],
                    },
                ],
            },
        ),

    deleteComment: async function (commentId) {
        const queries = [];

        const deleteComment = async (id) => {
            return this.deleteComment(id);
        };

        queries.push(deleteByCommentId(commentId));

        const comments = await commentModel.find(
            { parent: commentId },
            { _id: 1 },
        );

        queries.push(...comments.map((comment) => deleteComment(comment._id)));

        return Promise.all(queries);
    },
};
