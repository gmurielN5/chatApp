const express = require("express")
const { createServer } = require("http")
const { Server } = require("socket.io")

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

const port = 8000

const cors = require("cors")
const util = require("util")
const crypto = require("crypto")

const randomId = () => crypto.randomBytes(8).toString("hex")
const { findSesssion, saveSession, findAllSessions } = require("./SessionStore")

app.use(cors())

//session ID (private): used to authenticate user upon reconnection
// username (public) : identifier for exchanging messages

io.use((socket, next) => {
  const sessionID = socket.handshake.auth.sessionID
  if (sessionID) {
    //find existing session
    const session = findSesssion(sessionID)
    console.log(session)
    if (session) {
      socket.sessionID = sessionID
      socket.userID = session.userID
      socket.username = session.username
      return next()
    }
  }
  const username = socket.handshake.auth.username
  if (!username) {
    return next(new Error("invalid username"))
  }
  socket.sessionID = randomId()
  socket.userID = randomId()
  socket.username = username
  next()
})

io.on("connection", (socket) => {
  const users = []
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
      connected: socket.connected,
    })
  }

  socket.emit("users", users)
  socket.broadcast.emit("new user connected", {
    userID: socket.id,
    username: socket.username,
    connected: true,
  })

  socket.on("private message", ({ content, to }) => {
    socket.to(to).emit("private message", {
      content,
      from: socket.id,
    })
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
