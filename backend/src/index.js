require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const db = require('./config/db')
const Router = require('./routes')
const authMiddleware = require('./app/middlewares/authMiddleware')

const app = express();
const PORT = process.env.PORT

const http = require('http').Server(app)
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected`);

    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected`);
    });
})

app.use(cors({
    allowedHeaders: '*'
}))

// Connect DB
db.connect();

// middleware trong express xử lý dữ liệu dạng JSON
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

// Middleware authentication
app.use('/api/private', authMiddleware)

// Router init
Router(app);

mongoose.connection
    .once('open', () => {
        app.listen(PORT, () => console.log('Server running on port: ' + PORT))
    })