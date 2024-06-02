const createMessage = (status, message) => {
    if (message) return message;

    switch (status) {
        case 400:
            return 'Bad request';
        case 401:
            return 'Unauthorized';
        case 403:
            return 'Forbidden';
        case 404:
            return 'Not Found';
        default:
            return 'Internal Server Error';
    }
};

const createError = (status = 500, message) => {
    const error = new Error(createMessage(status, message));

    error.status = status;

    return error;
};

module.exports = createError;
