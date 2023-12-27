const { siteService } = require('../services');

module.exports = {
    search: async (req, res, next) => {
        const _id = req.body._id;
        const searchValue = req.params.search;
        const skip = req.query.skip || 0;
        const limit = req.query.limit || 8;

        try {
            const users = await siteService.search(
                _id,
                searchValue,
                skip,
                limit,
            );

            res.json(users);
        } catch (error) {
            next(error);
        }
    },

    gifs: async (req, res, next) => {
        const { q, offset, limit } = req.query;

        try {
            const result = await siteService.gifs(
                +offset ?? 0,
                +limit ?? 5,
                q ?? '',
            );

            res.json(
                result.data.data.map((gif) => ({
                    _id: gif.id,
                    title: gif.title,
                    url: gif.images.original.url,
                })),
            );
        } catch (error) {
            next(error);
        }
    },
};
