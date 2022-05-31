import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { MainContext } from "../../context"

import "../../Style/rooms.scss"

export const Rooms = ({ socket }) => {
  const { username, room, setRoom, setUsers } = useContext(MainContext)

  useEffect(() => {
    socket.on("users", (users) => {
      setUsers(users)
    })
  }, [socket, setUsers])
  // create new room
  const onSumbitNewRoom = (e) => {
    // add condition if room doesn t exist
    // add condition for minimun letter in room input
    //create new room
    socket.emit("new room", { username, room })
    //else join room
  }
  // join new room
  const onSubmitJoinRoom = (e) => {
    // change value of room in context
    // passing socket.name as key and set state of room as key
    // then send socket.emit passing room as argument
    socket.emit("join room", { username, room })
    //else join room
  }
  return (
    <main className="rooms">
      <h1>Create a new room</h1>
      <input
        placeholder="Enter your room name"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      ></input>
      <Link to="/chat">
        <button onClick={onSumbitNewRoom}>Create a new room</button>
      </Link>
      <h1>Join a room </h1>
      <h2>list of rooms </h2>
      <ul>
        {/* todo fetch rooms opened from backend (Redis) */}
        <li>rooms 1 </li>
        <li>rooms 2 </li>
      </ul>
    </main>
  )
}
