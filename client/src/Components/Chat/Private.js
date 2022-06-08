import React, { useState, useContext, useEffect, useReducer } from "react"

import { MainContext } from "../../context"

import "../../Style/private.scss"

export const PrivateMessage = ({ socket }) => {
  const { users, setUsers } = useContext(MainContext)
  const [isUser, setIsUser] = useState(false)

  //retrieve own user and add
  useEffect(() => {
    socket.on("users", (users) => {
      users.forEach((user) => {
        let userActive = user.userID === socket.id
        setIsUser(userActive)
      })
    })
  }, [socket, isUser])

  useEffect(() => {
    socket.on("new user connected", (user) => {
      // push new user to list of users
      setUsers((users) => [...users, user])
    })
  }, [socket, setUsers])

  //connect to room

  //retrieve list of rooms opened and users in the rooms
  // emit a join room

  return (
    <main className="container">
      <div className="sidebar">
        <h2>users connected : {users.length}</h2>
        {users.map((user, index) => {
          return <p>{user.username}</p>
        })}
      </div>
    </main>
  )
}
