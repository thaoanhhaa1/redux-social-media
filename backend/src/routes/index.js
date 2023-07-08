function Router(app) {
    const users = require('./users');
    const auth = require('./auth');
    const sites = require('./sites');
    const tweets = require('./tweets');
    const follow = require('./follow');
    const stories = require('./stories');
    const onlineStatus = require('./onlineStatus');

    app.use('/api/private/users', users);
    app.use('/api/private/tweets', tweets);
    app.use('/api/private/follow', follow);
    app.use('/api/private/stories', stories);
    app.use('/api/private/online-status', onlineStatus);
    app.use('/api/private', sites);
    app.use('/api/auth', auth);
}

module.exports = Router;
