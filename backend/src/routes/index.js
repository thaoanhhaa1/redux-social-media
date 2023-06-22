function Router(app) {
    const users = require('./users')

    app.use('/api/users', users)
}

module.exports = Router