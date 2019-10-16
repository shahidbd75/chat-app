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

var count = 0;
io.on('connection', (socket) => {
    console.log('Web Socket is connected to the server');

    socket.emit('eventEmitter', count);
    socket.on('increment', () => {
        count ++;
        //socket.emit('eventEmitter', count);
        io.emit('eventEmitter', count);
    });
})

server.listen(port, () => {
    console.log(`Server is up on the ${port}!`);
});