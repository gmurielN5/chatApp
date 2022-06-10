import React, { useContext, useEffect } from "react"
import { AccountContext } from "../context"
import { User } from "./user"

import "../Style/chat.scss"

const Sidebar = ({ socket, handleClick }) => {
  const { players, setPlayers } = useContext(AccountContext)

  //retrieve own user and add
  useEffect(() => {
    socket.on("connect", () => {
      players.forEach((user) => {
        if (user.self) {
          let updateUser = {
            ...user,
            connected: true,
          }
          setPlayers((players) => [...players, updateUser])
        }
      })
    })
    socket.on("disconnect", () => {
      players.forEach((user) => {
        if (user.self) {
          let updateUser = {
            ...user,
            connected: false,
          }
          setPlayers((players) => [...players, updateUser])
        }
      })
    })
    socket.on("users", (users) => {
      users.forEach((user) => {
        let newUser = {
          ...user,
          self: user.userID === socket.id,
        }
        setPlayers((players) => [...players, newUser])
      })
      // put the current user first, and then sort by username
    })
    return () => {
      socket.off("connect")
      socket.off("disconnect")
    }
  }, [socket, setPlayers, players])

  useEffect(() => {
    socket.on("new user connected", (user) => {
      // push new user to list of users
      setPlayers((players) => [...new Set([...players, user])])
    })
  }, [socket, setPlayers])

  //select user for private messaging

  return (
    <div>
      <p>users connected : {players.length}</p>
      {players && players.length > 0 ? (
        players.map((user, index) => (
          <User user={user} key={user.userID} handleClick={handleClick} />
        ))
      ) : (
        <p>loading users...</p>
      )}
    </div>
  )
}

export default Sidebar
