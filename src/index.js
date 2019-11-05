const path  = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const Filter = require('bad-words');

const { generateMessage, generateLocationMessage } = require('./utils/message');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users');

const app = express();
const server = http.createServer(app);

const io = socketIO(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname , '../public');


app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        const filter = new Filter();

        if(filter.isProfane(message)) {
            return callback('Do not use bad word');
        }

        io.to(user.room).emit('newMessage', generateMessage(message));
        callback('Delivered');
    });

    socket.on('shareLocation', (position, callback) => {
        socket.broadcast.emit('sendLocation', generateLocationMessage(position));
        callback('Location Shared');
    });
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('newMessage', generateMessage(`${user.username} has left!`));
        }
    });

    socket.on('join',(options, callback) => {
        const { error, user } = addUser({ id: socket.id, ...options});

        if(error) {
            return callback(error);
        }
        socket.join(user.room);
        socket.emit('newMessage',generateMessage(`Welcome to ${user.room}!!!`));
        socket.broadcast.to(user.room).emit('newMessage',generateMessage(`${user.username} has joined`));

        callback();
    });
});

server.listen(port, () => {
    console.log(`Server is up on the ${port}!`);
});