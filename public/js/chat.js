var socket = io();

document.getElementById('form-message').addEventListener('submit', (e) => {
    e.preventDefault();

    const message = e.target.elements.message.value;

    socket.emit('sendMessage', message);
});

socket.on('newMessage', (data) => {
    console.log(data);
});