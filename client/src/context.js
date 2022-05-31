import React, { useState } from "react"

const MainContext = React.createContext()

const MainProvider = ({ children }) => {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [users, setUsers] = useState([])
  const [rooms, setRooms] = useState([])

  return (
    <MainContext.Provider
      value={{
        username,
        room,
        users,
        rooms,
        setUsername,
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
