function handleErrorMiddleware(err, _, res, _) {
    if (process.env.NODE_ENV === 'development') console.error(err.stack);

    if (err.status)
        return res.status(err.status).json({
            status: err.status,
            message: err.message,
        });

    return res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
    });
}

module.exports = handleErrorMiddleware;
