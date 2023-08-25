function handleErrorMiddleware(err, req, res, next) {
    if (process.env.NODE_ENV === 'development')
        console.log('🚀 ~ handleErrorMiddleware ~ err:', err);

    return res.send(400);
}

module.exports = handleErrorMiddleware;
