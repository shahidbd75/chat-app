const path  = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = socketIO(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname , '../public');

app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
    socket.on('sendMessage', (message) => {
        io.emit('newMessage', message);
    });

    socket.broadcast.emit('newMessage','A user has joined');

    socket.on('disconnect', () => {
        io.emit('newMessage', 'A user has left!');
    });
});

server.listen(port, () => {
    console.log(`Server is up on the ${port}!`);
});