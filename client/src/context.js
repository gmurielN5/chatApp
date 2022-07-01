import React, { useState, createContext, useEffect } from "react"
import socketconn from "./socket"

const context = createContext()

const ContextApp = ({ children }) => {
  //add token in user state
  const [user, setUser] = useState({
    loggedIn: null,
    sessionID: localStorage.getItem("sessionID"),
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
