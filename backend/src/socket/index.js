const { default: mongoose } = require('mongoose');
const onlineStatusModel = require('../app/models/onlineStatusModel');

function connect(server) {
    const io = require('socket.io')(server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST'],
        },
    }); //? invoking the func also something like func()

    global.sockets = [];
    io.on('connection', (socket) => {
        const userId = socket.handshake?.auth?._id;

        console.log(`Socket.io connection ${socket.id}`);

        // FIXME emit online/offline event
        io.emit('online', userId);

        global.sockets.push(socket);
        global.socketIo = io;

        socket.on('online', ({ userId }) => {
            io.emit('online', userId);
        });

        socket.on('disconnect', async function () {
            global.sockets = global.sockets.filter((s) => socket.id !== s.id);
            const date = new Date();

            io.emit('offline', {
                userId,
                date,
            });

            if (userId)
                await onlineStatusModel.updateOne(
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
}

module.exports = {
    connect,
};
