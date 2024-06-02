const { createError } = require('../../utils');
const { followService, listService } = require('../services');

module.exports = {
    // [POST] /api/private/lists/add
    // body: userId
    add: async (req, res, next) => {
        const { _id, userId } = req.body;

        try {
            const [find, isBlocked] = await Promise.all([
                listService.findById(_id),
                followService.isBlocked(_id, userId),
            ]);

            if (isBlocked)
                throw createError(403, 'You are blocked by this user');

            if (find) await listService.add({ _id, userId });
            else await listService.create({ _id, userId });
            res.json({ result: userId });
        } catch (error) {
            next(error);
        }
    },

    // [POST] /api/private/lists/remove
    // body: userId
    remove: async (req, res, next) => {
        const { _id, userId } = req.body;

        try {
            await listService.remove({ _id, userId });

            res.json({ result: userId });
        } catch (error) {
            next(error);
        }
    },
};
