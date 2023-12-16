function handleErrorMiddleware(err, _, res, _) {
    console.log(err);

    if (process.env.NODE_ENV === 'development')
        console.log('🚀 ~ handleErrorMiddleware ~ err:', err);

    return res.status(400).json({
        status: 400,
        message: 'Bad request',
    });
}

module.exports = handleErrorMiddleware;
