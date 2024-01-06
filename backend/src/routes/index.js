function Router(app) {
    const users = require('./users');
    const auth = require('./auth');
    const sites = require('./sites');
    const tweets = require('./tweets');
    const follow = require('./follow');
    const stories = require('./stories');
    const onlineStatus = require('./onlineStatus');
    const locations = require('./locations');
    const lists = require('./lists');
    const comments = require('./comments');
    const notifications = require('./notifications');
    const bookmarks = require('./bookmarks');

    app.use('/api/private/users', users);
    app.use('/api/private/tweets', tweets);
    app.use('/api/private/follow', follow);
    app.use('/api/private/stories', stories);
    app.use('/api/private/online-status', onlineStatus);
    app.use('/api/private/locations', locations);
    app.use('/api/private/lists', lists);
    app.use('/api/private/comments', comments);
    app.use('/api/private/notifications', notifications);
    app.use('/api/private/bookmarks', bookmarks);
    app.use('/api/private', sites);
    app.use('/api/auth', auth);
}

module.exports = Router;
