const express = require("express")
const { createServer } = require("http")
const { Server } = require("socket.io")

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

const cors = require("cors")
const util = require("util")
const port = 8000

const { addUser, getUserbyId, deleteUser, getUsersInRoom } = require("./users")

app.use(cors())

io.on("connection", (socket) => {
  console.log("a user connected ")
  // fetch all rooms opened
  // rewrite function
  io.emit("rooms", getRooms())

  // when user disconnected send message to other in room
  socket.on("disconnect", () => {
    console.log("user disconnected")
    const user = deleteUser(socket.id)
    if (user) {
      io.to(user.room).emit("notification", {
        userId: user.id,
        username: user.username,
        text: `${user.username} has left the room`,
      })
      io.in(user.room).emit("users", getUsersInRoom(user.room))
    }
  })

  socket.on("new room", ({ username, room }) => {
    const user = addUser(socket.id, username, room)

    console.log(`A new room is created ${room}, ${username} joined that room`)
    socket.room = room
    socket.join(room)
    socket.to(room).emit("notification", {
      text: `${username} has joined the chat`,
    })
    // get all particpants in room
    io.in(room).emit("users", getUsersInRoom(room))
  })

  // Join room when click on a room in a list
  // socket.on("join room", ({username, room}) => {
  //   console.log(`A new user joined room ${room}`);
  //   socket.room = room;
  //   socket.join(room);
  //   socket.broadcast.to(p_user.room).emit("message", {
  //     userId: p_user.id,
  //     username: p_user.username,
  //     text: `${p_user.username} has joined the chat`,
  //   });
  //   // get all particpants in room
  //   io.in(room).emit("users", getUsersInRoom(room));
  // });

  // receive on new message
  // send data back
  socket.on("sendMessage", async (text) => {
    try {
      const user = await getUserbyId(socket.id)
      io.in(user.room).emit("message", {
        user: user.username,
        text: text,
      })
    } catch (e) {
      console.log(e)
    }
  })
})

httpServer.listen(
  port,
  console.log(`Server is running on the port no: ${port} `)
)

const getRooms = () => {
  const rooms = io.of("/").adapter.rooms
  /*Returns data in this form
  {
    'roomid1': { 'socketid1', socketid2', ...},
    ...
  }
  */
  console.log("getRooms rooms>>" + util.inspect(rooms))

  // const list = {};

  // for (let roomId in rooms) {
  //   const room = rooms[roomId];
  //   if (room === undefined) continue;
  //   const sockets = [];
  //   let roomName = "";
  //   //console.log('getRooms room>>' + util.inspect(room));
  //   for (let socketId in room.sockets) {
  //     const socket = nsp.connected[socketId];
  //     if (
  //       socket === undefined ||
  //       socket.username === undefined ||
  //       socket.room === undefined
  //     )
  //       continue;
  //     //console.log(`getRooms socket(${socketId})>>${socket.username}:${socket.room}`);
  //     sockets.push(socket.username);
  //     if (roomName == "") roomName = socket.room;
  //   }
  //   if (roomName != "") list[roomName] = sockets;
  // }

  // console.log(`getRooms: ${msg} >>` + util.inspect(list));

  // return list;
}
