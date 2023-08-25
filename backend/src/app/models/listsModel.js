const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    list: {
        type: Array,
        required: true,
    },
});

module.exports = mongoose.model('list', listSchema);
