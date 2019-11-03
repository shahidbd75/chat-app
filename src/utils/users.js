const users = [];

const addUser = ({id, username, room}) => {
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    if(!username || !room) {
        return {
            'error': 'Username and room are required!'
        };
    }

    const existingUser = users.find((user) => {
        return user.room === room && user.username === username;
    });

    if(existingUser) {
        return {
            'error': `${username} is in use`
        };
    }

    const user = {id, username, room};

    users.push(user);

    return user;
};

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
        return users.splice(index,1)[0];
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id);
}

const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase();
    return users.filter((user) => user.room === room);
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
};




// Test Code

// addUser({id: 1,username :'Shahid Ab', room: 'Rajshahi University'});
// addUser({id: 2,username :'Rifat', room: 'Rajshahi University'});
// addUser({id: 3,username :'Zaman', room: 'Dhaka University'});

// // console.log(users);

// // console.log(getUser(2));

// console.log(getUsersInRoom('rajshahi University'));

// // var testUser = addUser({id: 1,username :'aa', room: 'Rajshahi University'});

// // console.log(testUser);

// console.log(removeUser(1));

// console.log(users);