const users = [];

// joins the user to the specific chatroom
const addUser = (id, username, room) => {
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const user = { id, username, room };

  users.push(user);
  return { user };
};

// Gets a particular user id to return the current user
const getUserbyId = (id) => {
  return users.find((user) => user.id === id);
};

// called when the user leaves the chat and its user object deleted from array
const deleteUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

// get all users in current room
const getUsersInRoom = (room) => {
  return users.filter((user) => user.room === room);
};

module.exports = {
  addUser,
  getUserbyId,
  deleteUser,
  getUsersInRoom,
};
