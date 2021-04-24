const users = [];

var colorIdx = 0;

const addUser = ({ id, name, room }) => {
    const shortName = name.trim().toLowerCase();
    const shortRoom = room.trim().toLowerCase();

    const exists = users.find((user) => user.name.trim().toLowerCase() === shortName && user.room.trim().toLowerCase() === shortRoom);

    if (exists) {
        return { error: 'Username exists !!' }
    }

    const user = { id, name, room , colorIdx};
    colorIdx = (colorIdx + 1)%5;

    users.push(user);

    return { user };
}

const removeUser = (id) => {
    const index = users.find((user) => user.id === id);

    if (index != -1) {
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => users.find((user) => user.id === id);


const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };