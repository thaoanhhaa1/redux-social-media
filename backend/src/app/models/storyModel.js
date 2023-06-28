const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const StoryModel = new Schema({
    user: {
        type: String,
        required: true
    },
    story: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('story', StoryModel)