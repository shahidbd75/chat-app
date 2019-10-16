var socket = io();

document.getElementById('form-message').addEventListener('submit', (e) => {
    e.preventDefault();

    const message = e.target.elements.message.value;

    socket.emit('sendMessage', message);
});

document.getElementById('btnShare').addEventListener('click', () => {
    if(!navigator.geolocation) {
        return alert('your browser doesnot support geolocation');
    }
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
    })

});

socket.on('newMessage', (data) => {
    console.log(data);
});