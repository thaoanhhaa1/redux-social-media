const socketIoLib = require('socket.io');
const tweetSocket = require('./tweetSocket');
const { socketEvents } = require('../constants');
const { setOffline } = require('../app/services/onlineStatusService');

function connect(server) {
    const io = socketIoLib(server, {
        cors: {
            origin: process.env.FE_URL,
            methods: ['GET', 'POST'],
        },
    });

    global.socketIo = io;
    global.sockets = [];

    io.on(socketEvents.on.CONNECTION, (socket) => {
        const userId = socket.handshake?.auth?._id;

        socket.join(userId);

        // ! DELETE in production
        console.log(`Socket.io connection ${socket.id}`);

        io.emit(socketEvents.emit.ONLINE, userId);

        global.sockets.push(socket);

        socket.on(socketEvents.on.ONLINE, ({ userId }) => {
            io.emit(socketEvents.emit.ONLINE, userId);
        });

        socket.on(socketEvents.on.DISCONNECT, async function () {
            global.sockets = global.sockets.filter((s) => socket.id !== s.id);
            const date = new Date();
            const data = {
                userId,
                date,
            };

            io.emit(socketEvents.emit.OFFLINE, data);
            if (userId) setOffline(data).then();
        });

        tweetSocket.join(socket, io);
    });
}

module.exports = {
    connect,
};
