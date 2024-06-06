const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    isPin: {
        type: Boolean,
        default: false,
    },
});

const listSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    list: {
        type: [itemSchema],
        required: true,
    },
});

module.exports = mongoose.model('list', listSchema);
