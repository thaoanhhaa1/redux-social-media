const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const followModel = new Schema({
    user: {
        type: String,
        required: true
    },
    followers: {
        type: Array,
        required: true
    },
    following: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('follow', followModel)