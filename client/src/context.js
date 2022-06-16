import React, { useState, createContext, useEffect } from "react"
import socketconn from "./socket"

const context = createContext()

const ContextApp = ({ children }) => {
  const [user, setUser] = useState({
    username: "",
    loggedIn: null,
  })
  const [players, setPlayers] = useState([])
  const [socket, setSocket] = useState(socketconn)

  useEffect(() => {
    setSocket(socketconn)
  }, [setSocket])

  return (
    <context.Provider
      value={{
        user,
        setUser,
        players,
        setPlayers,
        socket,
      }}
    >
      {children}
    </context.Provider>
  )
}

export { context, ContextApp }
