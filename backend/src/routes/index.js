function Router(app) {
    const users = require('./users')
    const auth = require('./auth')
    const sites = require('./sites')
    const tweet = require('./tweet')
    const follow = require('./follow')

    app.use('/api/private/users', users)
    app.use('/api/private/tweet', tweet)
    app.use('/api/private/follow', follow)
    app.use('/api/auth', auth)
    app.use('/api/private', sites)
}

module.exports = Router