import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { MainContext } from "../../context"

import "../../Style/rooms.scss"

export const Rooms = ({ socket }) => {
  const { user, room, users, rooms, setUser, setRoom, setUsers, setRooms } =
    useContext(MainContext)
  useEffect(() => {
    console.log(user)
    socket.on("users", (users) => {
      setUsers(users)
      console.log(`users :${users}`)
      //find a way to save id/ username from data and
      // save user
    })
  }, [socket, setUsers])

  //connect to room
  // create new room
  const onSumbitNewRoom = (e) => {
    //create new room
    socket.emit("new room", { user, room })
    //else join room
  }

  //retrieve list of rooms opened and users in the rooms
  // emit a join room

  return (
    <main className="rooms">
      <h2>users connected : {users.length}</h2>
      <h1>Create a new room</h1>
      <input
        placeholder="Create room"
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
