var socket = io();

const $message_template = document.querySelector('#message-templete').innerHTML;
const $location_template = document.querySelector('#location-templete').innerHTML;
const txtMessage = document.getElementById('txtMessage');
const $btnSend = document.querySelector('#btnSend');
const $btnLocationShare = document.querySelector('#btnShare');
const messageWindow = document.querySelector('#message');
const messageForm = document.getElementById('form-message');

const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix:true});

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    $btnSend.setAttribute('disabled','disabled');
    const message = e.target.elements.message.value;

    socket.emit('sendMessage', message, (delivered) => {
        if(delivered) {
            console.log(delivered);
        }
        $btnSend.removeAttribute('disabled');
        console.log('message sent', delivered);
        txtMessage.value = '';
        txtMessage.focus();
    });
});

$btnLocationShare.addEventListener('click', () => {
    if(!navigator.geolocation) {
        return alert('your browser doesnot support geolocation');
    }
    $btnLocationShare.setAttribute('disabled','disabled');
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('shareLocation', `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`, (callBack) => {
            console.log(callBack);
            $btnLocationShare.removeAttribute('disabled');
        });
    });
});

socket.on('newMessage', (data) => {
    const html = Mustache.render($message_template, {
        message: data.message,
        createdAt: moment(data.createdAt).format('hh:mm a')
    });

    messageWindow.insertAdjacentHTML('beforeend',html);
});

socket.on('sendLocation', (data) => {
    const htmlMap = Mustache.render($location_template, {
        url: data.url,
        createdAt: moment(data.createdAt).format('hh:mm a')
    });
    messageWindow.insertAdjacentHTML('beforeend',htmlMap);
})

socket.emit('join', { username, room });