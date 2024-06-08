const on = {
    CONNECTION: 'connection',
    ONLINE: 'online',
    DISCONNECT: 'disconnect',
};
const emit = {
    ONLINE: 'online',
    OFFLINE: 'offline',
    NOTIFICATION: 'notification',
    LIKE_TWEET: 'like-tweet',
    DISLIKE_TWEET: 'dislike-tweet',
    LIKE_COMMENT: 'like-comment',
    DISLIKE_COMMENT: 'dislike-comment',
    COMMENT_TWEET: 'comment-tweet',
    BLOCK: 'block',
    UNBLOCK: 'unblock',
    EDIT_COMMENT: 'edit-comment',
    DELETE_COMMENT: 'delete-comment',
    DELETE_TWEET: 'delete-tweet',
};

module.exports = {
    on,
    emit,
};
