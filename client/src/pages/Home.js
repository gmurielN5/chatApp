import { createContext, useContext, useEffect, useState } from "react"
import socket from "../socket"
import { AccountContext } from "../context"

import Sidebar from "../Components/Sidebar"
import { Message } from "../Components/Message"

import "../Style/home.scss"

export const SocketContext = createContext()

const Home = () => {
  const { user, setUser, players, setPlayers } = useContext(AccountContext)
  const { username } = user
  const [selectedUser, setSelected] = useState(null)

  useEffect(() => {
    socket.auth = { username }
    socket.connect()
    socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        console.log(err.message)
        setUser({ loggedIn: false })
      }
    })
    return () => {
      socket.off("connect_error")
    }
  }, [socket])

  const handleClick = (user) => {
    setSelected(user)
    console.log(selectedUser)
  }
  //move all socket.io call to home

  return (
    <SocketContext.Provider value={{ socket }}>
      <main className="homepage">
        <div className="left-panel">
          <Sidebar handleClick={handleClick} />
        </div>
        <div className="right-panel">
          {selectedUser && <Message selectedUser={selectedUser} />}
        </div>
      </main>
    </SocketContext.Provider>
  )
}

export default Home
