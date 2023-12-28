const jwt = require('jsonwebtoken');
const { errors } = require('../../utils');
const tokenModel = require('../models/tokenModel');

async function authMiddleware(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        res.status(401).json(errors[401]());
        return;
    }

    try {
        const { _id, username } = jwt.verify(token, process.env.TOKEN_SECRET);

        const tokenFind = await tokenModel.findOne({ token });

        if (tokenFind) throw new Error();

        req.body.username = username;
        req.body._id = _id;

        next();
    } catch (error) {
        res.status(401).json(errors[401]());
    }
}

module.exports = authMiddleware;
