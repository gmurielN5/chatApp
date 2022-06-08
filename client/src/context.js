import React, { useState } from "react"

const MainContext = React.createContext()

const MainProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false)
  const [lastMessage, setLastMessage] = useState(null)
  const [room, setRoom] = useState("")
  const [users, setUsers] = useState([])
  const [rooms, setRooms] = useState([])

  return (
    <MainContext.Provider
      value={{
        isConnected,
        setIsConnected,
        lastMessage,
        setLastMessage,
        room,
        users,
        rooms,
        setRoom,
        setUsers,
        setRooms,
      }}
    >
      {children}
    </MainContext.Provider>
  )
}

export { MainContext, MainProvider }
