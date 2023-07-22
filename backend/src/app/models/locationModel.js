const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const locationSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('location', locationSchema);
