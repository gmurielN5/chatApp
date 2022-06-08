const express = require("express")
const { createServer } = require("http")
const { Server } = require("socket.io")

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

const cors = require("cors")
const util = require("util")
const port = 8000

app.use(cors())

io.use((socket, next) => {
  const username = socket.handshake.auth.username
  if (!username) {
    return next(new Error("invalid username"))
  }
  socket.username = username
  next()
})

io.on("connection", (socket) => {
  console.log("a user connected ")
  const users = []
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    })
  }
  socket.emit("users", users)
  socket.broadcast.emit("new user connected", {
    userID: socket.id,
    username: socket.username,
  })

  //user leave room
  //notify the other user is disconnected
  socket.on("disconnect", () => {
    console.log("user disconnected")
  })
})

httpServer.listen(
  port,
  console.log(`Server is running on the port no: ${port} `)
)
