import React, { useState, createContext, useEffect } from "react"
import socketconn from "./socket"

const context = createContext()

const ContextApp = ({ children }) => {
  const [sessionID] = useState(localStorage.getItem("sessionID"))
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [players, setPlayers] = useState([])
  const [socket, setSocket] = useState(socketconn)

  useEffect(() => {
    setSocket(socketconn)
  }, [setSocket])

  return (
    <context.Provider
      value={{
        sessionID,
        isLoggedIn,
        setIsLoggedIn,
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
