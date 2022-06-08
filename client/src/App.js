import { Routes, Route } from "react-router-dom"
import { MainProvider } from "./context"
import io from "socket.io-client"

import "./App.scss"

import { Home } from "./Components/Chat/Home"
import { PrivateMessage } from "./Components/Chat/Private"
import { Rooms } from "./Components/Chat/Rooms"
import { Chat } from "./Components/Chat/Chat"
import { NotFound } from "./Components/Chat/NotFound"

const socket = io({
  autoConnect: false,
})

console.log(socket)
socket.onAny((event, ...args) => {
  console.log(event, args)
})

function App() {
  return (
    <MainProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home socket={socket} />} />
          <Route path="private" element={<PrivateMessage socket={socket} />} />
          {/* <Route path="rooms" element={<Rooms socket={socket} />} />
          <Route path="chat" element={<Chat socket={socket} />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </MainProvider>
  )
}

export default App
