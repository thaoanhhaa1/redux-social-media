const ListModel = require('../models/listsModel');

module.exports = {
    remove: ({ _id, userId }) =>
        ListModel.updateOne({ _id }, { $pull: { list: userId } }),

    add: ({ _id, userId }) =>
        ListModel.updateOne({ _id }, { $addToSet: { list: userId } }),

    create: ({ _id, userId }) =>
        new ListModel({
            _id,
            list: [userId],
        }).save(),

    findById: (id) => ListModel.findById(id),
};
