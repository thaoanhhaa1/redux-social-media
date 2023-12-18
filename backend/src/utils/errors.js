const errors = {
    400: () => ({
        status: 400,
        message: 'Bad request',
    }),
    401: () => ({
        status: 401,
        message: 'Unauthorized',
    }),
    404: (message = 'Not Found') => ({
        status: 404,
        message: message,
    }),
};

module.exports = errors;
