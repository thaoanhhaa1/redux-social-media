const express = require('express')
const cors = require('cors')
const Pusher = require("pusher");
const mongoose = require('mongoose')

const db = require('./config/db')
const Router = require('./routes')
const authMiddleware = require('./app/middlewares/authMiddleware')

const app = express();
const PORT = 8080

const pusher = new Pusher({
    appId: "1624436",
    key: "694366bfed328f4add3f",
    secret: "b5d76a4ebd0fcb573063",
    cluster: "ap1",
    useTLS: true
});

require('dotenv').config()

app.use(cors({
    allowedHeaders: '*'
}))

// Connect DB
db.connect();

// middleware trong express xử lý dữ liệu dạng JSON
app.use(express.json())

// Middleware authentication
app.use('/api/private', authMiddleware)

// Router init
Router(app);

mongoose.connection
    .once('open', () => {
        app.listen(PORT, () => console.log('Server running on port: ' + PORT))
    })