const { Schema, model } = require('mongoose');

const tokenSchema = new Schema(
    {
        token: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = model('token', tokenSchema);
