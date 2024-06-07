const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const trendingSchema = new Schema(
    {
        _id: { type: String, required: true },
        quantity: { type: Number, required: true },
        type: {
            type: String,
            enum: ['tweet'],
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const TrendingModel = mongoose.model('Trending', trendingSchema);

module.exports = TrendingModel;
