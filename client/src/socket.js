import { io } from "socket.io-client"
const URL = "http://localhost:3000"
const socketconn = io(URL, { autoConnect: false })

socketconn.onAny((event, ...args) => {
  console.log(event, args)
})

export default socketconn
