const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

// router is exported from router.js
const router = require('./router');


const io = socketio(server);


// using router exported from router.js as middleware for routes
app.use(router);


server.listen(PORT, () => {
    console.log('Server started on port = ' + PORT);
});

