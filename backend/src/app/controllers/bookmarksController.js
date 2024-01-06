const bookmarkService = require('../services/bookmarkService');

module.exports = {
    getAll: async (req, res, next) => {
        const _id = req.body._id;

        try {
            const bookmarks = await bookmarkService.getAll(_id);

            return res.json(bookmarks);
        } catch (error) {
            next(error);
        }
    },
};
