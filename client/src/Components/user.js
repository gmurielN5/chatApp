import { useContext } from "react"
import { context } from "../context"
import "../Style/user.scss"

export const User = ({ user }) => {
  const { setPlayers } = useContext(context)

  const handleClick = (user) => {
    setPlayers((pevPlayers) => {
      return [...pevPlayers].map((player) => {
        if (player.userID === user.userID) {
          player.selected = true
        } else {
          player.selected = false
        }
        return player
      })
    })
  }

  return (
    <div className={`${user.self ? "active" : ""}`}>
      <div
        onClick={() => handleClick(user)}
        className={`user ${user.selected ? "selected" : ""}`}
      >
        <div>
          <p>
            {user.username} {user.self ? " (yourself)" : ""}
          </p>
        </div>
        <div className="status">
          <i className={`icon ${user.connected ? "connected" : ""}`}></i>
          <span>{user.connected ? "online" : "offline"}</span>
        </div>
        {/* conditionnaly render div if hasNewmessage is true */}
        <div className="new-message">
          {/* add icon and return number of messages waiting */}
        </div>
      </div>
    </div>
  )
}
