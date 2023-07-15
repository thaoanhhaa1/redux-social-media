require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const db = require('./config/db');
const Router = require('./routes');
const authMiddleware = require('./app/middlewares/authMiddleware');
const OnlineStatusModel = require('./app/models/onlineStatusModel');

const app = express();
const PORT = process.env.PORT;

// MIDDLEWARES
app.use(
    cors({
        allowedHeaders: '*',
    }),
);

// middleware trong express xử lý dữ liệu dạng JSON
app.use(express.json());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    }),
);

// Middleware authentication
app.use('/api/private', authMiddleware);

// Connect DB
db.connect();

// Router init
Router(app);

mongoose.connection.once('open', () => {
    const serverWithSocket = app.listen(PORT, () =>
        console.log('Server running on port: ' + PORT),
    );

    const io = require('socket.io')(serverWithSocket, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST'],
        },
    }); //? invoking the func also something like func()

    global.sockets = [];
    io.on('connection', (socket) => {
        const userId = socket.handshake?.auth?._id;

        console.log(`Socket.io connection ${socket.id}`);
        io.emit('online', userId);

        global.sockets.push(socket);
        global.socketIo = io;

        socket.on('disconnect', async function () {
            global.sockets = global.sockets.filter((s) => socket.id !== s.id);
            const date = new Date();

            io.emit('offline', {
                userId,
                date,
            });

            if (userId)
                await OnlineStatusModel.updateOne(
                    {
                        _id: new mongoose.Types.ObjectId(userId),
                    },
                    {
                        $set: {
                            offline: date,
                        },
                    },
                );
        });
    });
});
