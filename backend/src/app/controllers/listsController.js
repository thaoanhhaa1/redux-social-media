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

    getUsers: async (req, res, next) => {
        const _id = req.body._id;
        const page = +(req.query.page || 1);

        try {
            const users = await listService.getUsers({
                userId: _id,
                page,
            });

            res.json(users);
        } catch (error) {
            next(error);
        }
    },

    getUser: async (req, res, next) => {
        const userId = req.body._id;
        const { username } = req.params;
        console.log('🚀 ~ getUser: ~ username:', username);

        try {
            const user = await listService.getUser({
                username,
                userId,
            });

            if (!user) throw createError(404, 'User not found');

            res.json(user);
        } catch (error) {
            next(error);
        }
    },

    countPages: async (req, res, next) => {
        const _id = req.body._id;

        try {
            const count = await listService.countUsers(_id);

            res.json(count);
        } catch (error) {
            next(error);
        }
    },

    togglePin: async (req, res, next) => {
        const { _id, isPin } = req.body;
        const userId = req.params.user_id;

        try {
            const result = await listService.togglePin({ _id, userId, isPin });

            if (result) return res.sendStatus(200);

            throw createError(400, 'Failed to pin/unpin user');
        } catch (error) {
            next(error);
        }
    },
};
