const jwt = require('jsonwebtoken');

async function authMiddleware(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        res.status(401).json({
            status: 401,
            message: 'Unauthorized',
        });
        return;
    }

    try {
        const { _id, username } = jwt.verify(token, process.env.TOKEN_SECRET);

        req.body.username = username;
        req.body._id = _id;
        next();
    } catch (error) {
        res.status(401).json({
            status: 401,
            message: 'Unauthorized',
        });
    }
}

module.exports = authMiddleware;
