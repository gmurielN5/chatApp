import { Routes, Route } from "react-router-dom"
import { MainProvider } from "./context"
// import io from "socket.io-client"
import "./App.scss"

import { Home } from "./Components/Chat/Home"
import { Rooms } from "./Components/Chat/Rooms"
import { Chat } from "./Components/Chat/Chat"
import { NotFound } from "./Components/Chat/NotFound"

import io from "socket.io-client"

const socket = io.connect("/")

function App() {
  return (
    <MainProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="rooms" element={<Rooms socket={socket} />} />
          <Route path="chat" element={<Chat socket={socket} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </MainProvider>
  )
}

export default App
