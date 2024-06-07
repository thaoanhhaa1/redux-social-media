const { createError } = require('../../utils');
const TrendingDetailModel = require('../models/trendingDetailModel');
const { tweetService } = require('../services');
const trendingService = require('../services/trendingService');

const getServiceByType = (type) => {
    return tweetService;
};

module.exports = {
    getTrending: async (req, res, next) => {
        const type = req.params.type;
        const page = parseInt(req.query.page) || 1;

        try {
            if (!type) throw createError(400, 'Type is required');

            const trending = await trendingService.getTrending({
                type,
                page,
            });

            res.json(trending);
        } catch (error) {
            next(error);
        }
    },

    getByTrending: async (req, res, next) => {
        const { type, id } = req.params;
        const _id = req.body._id;
        const page = parseInt(req.query.page) || 1;

        try {
            if (!type) throw createError(400, 'Type is required');
            if (!id) throw createError(400, 'Id is required');

            const service = getServiceByType(type);
            const trendingDetail = await TrendingDetailModel.findById(
                id.toLowerCase(),
            );

            if (!trendingDetail) throw createError(404, 'Trending not found');

            const document = await service.getByIds(
                _id,
                trendingDetail.documentIds,
                page,
            );

            if (!document) throw createError(404, 'Document not found');

            res.json(document);
        } catch (error) {
            next(error);
        }
    },

    countPages: async (req, res, next) => {
        const type = req.params.type;

        try {
            if (!type) throw createError(400, 'Type is required');

            const trending = await trendingService.countPages({ type });

            res.json(trending);
        } catch (error) {
            next(error);
        }
    },
};
