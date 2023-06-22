const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema;

const UserModel = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

UserModel.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('user', UserModel)