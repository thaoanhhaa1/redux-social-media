const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const friendModel = new Schema({
    user: {
        type: Types.ObjectId,
        required: true
    },
    friends: {
        type: mongoose.Types.ArraySubdocument,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('friend', friendModel)