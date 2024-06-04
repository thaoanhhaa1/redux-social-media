function handleErrorMiddleware(err, _req, res, _next) {
    console.error('Error:', err);

    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    return res.status(status).json({
        status: status,
        message: message,
    });
}

module.exports = handleErrorMiddleware;
