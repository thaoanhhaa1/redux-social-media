const jwt = require('jsonwebtoken')

async function authMiddleware(req, res, next) {
    const token = req.headers.authorization

    if (!token) {
        res.sendStatus(401)
        return;
    }

    try {
        const {
            _id,
            username
        } = jwt.verify(token, process.env.TOKEN_SECRET)

        req.body.username = username
        req.body._id = _id;
        next()
    } catch (error) {
        res.sendStatus(401)
    }
}

module.exports = authMiddleware