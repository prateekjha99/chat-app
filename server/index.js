const express = require('express');
const app = express();

const server = require("http").createServer();

const io = require("socket.io")(server, {
    cors: true
  })

const PORT = process.env.PORT || 5000;


// router is exported from router.js
const router = require('./router');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

io.on('connection', (socket) => {

    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if (error) return callback(error);

        socket.emit('message', { user: '', msg: `${user.name}, welcome to the room ${user.room}` });
        socket.broadcast.to(user.room).emit('message', { user: '', msg: `${user.name}, has joined !` });


        socket.join(user.room);
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        
        if(user){
            io.to(user.room).emit('message', { user: user, msg: message });
        }
        callback();
    })

    

    socket.on('close', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', { user: '', message: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        }
    });
});

// using router exported from router.js as middleware for routes
app.use(router);

server.listen(PORT, () => {
    console.log('Server started on port = ' + PORT);
});

