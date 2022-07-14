import React, { useContext } from "react"
import { Player } from "./player"
import { context } from "../context"
import "../Style/sidebar.scss"

const Sidebar = () => {
  const { players } = useContext(context)
  return (
    <div className="sidebar">
      <h2>players connected : {players.length}</h2>
      {players && players.length > 0 ? (
        players.map((player) => <Player player={player} key={player.userID} />)
      ) : (
        <p>loading players...</p>
      )}
    </div>
  )
}

export default Sidebar
