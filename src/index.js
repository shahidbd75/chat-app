const path  = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const Filter = require('bad-words');

const { generateMessage, generateLocationMessage } = require('./utils/message');

const app = express();
const server = http.createServer(app);

const io = socketIO(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname , '../public');


app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter();

        if(filter.isProfane(message)) {
            return callback('Do not use bad word');
        }

        io.emit('newMessage', generateMessage(message));
        callback('Delivered');
    });

    socket.on('shareLocation', (position, callback) => {
        socket.broadcast.emit('sendLocation', generateLocationMessage(position));
        callback('Location Shared');
    });
    socket.on('disconnect', () => {
        io.emit('newMessage', generateMessage('A user has left!'));
    });

    socket.on('join',({username, room}) => {
        socket.join(room);

        socket.emit('newMessage',generateMessage(`Welcome to ${room}!!!`));
        socket.broadcast.to(room).emit('newMessage',generateMessage(`${username} has joined`));
    });
});

server.listen(port, () => {
    console.log(`Server is up on the ${port}!`);
});