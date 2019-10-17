var socket = io();

document.getElementById('form-message').addEventListener('submit', (e) => {
    e.preventDefault();

    const message = e.target.elements.message.value;

    socket.emit('sendMessage', message, (delivered) => {
        if(delivered) {
            console.log(delivered);
        }
        console.log('message sent', delivered);
    });
});

document.getElementById('btnShare').addEventListener('click', () => {
    if(!navigator.geolocation) {
        return alert('your browser doesnot support geolocation');
    }
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('shareLocation', `www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`, (callBack) => {
            console.log(callBack);
        });
    });

});

socket.on('newMessage', (data) => {
    console.log(data);
});