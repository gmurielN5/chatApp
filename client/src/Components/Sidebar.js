import React, { useContext } from "react"
import { User } from "./user"
import { context } from "../context"
import "../Style/sidebar.scss"

const Sidebar = () => {
  const { players } = useContext(context)
  return (
    <div className="sidebar">
      <h2>users connected : {players.length}</h2>
      {players && players.length > 0 ? (
        players.map((user) => <User user={user} key={user.userID} />)
      ) : (
        <p>loading users...</p>
      )}
    </div>
  )
}

export default Sidebar
