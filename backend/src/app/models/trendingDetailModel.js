const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const trendingDetailSchema = new Schema(
    {
        _id: { type: String, required: true },
        documentIds: { type: [String], required: true },
    },
    {
        timestamps: true,
    },
);

const TrendingDetailModel = mongoose.model(
    'TrendingDetail',
    trendingDetailSchema,
);

module.exports = TrendingDetailModel;
