var socket = io();


socket.on('eventEmitter', (count) => {
    console.log(count);
});

document.getElementById('btnIncrement').addEventListener('click', () => {
    console.log('clicked!!');
    socket.emit('increment');
})