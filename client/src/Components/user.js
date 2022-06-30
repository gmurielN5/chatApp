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
        <div className="profile">
          <div className="name">
            <p>
              {user.username} {user.self ? " (yourself)" : ""}
            </p>
          </div>
          {user.hasNewmessage && (
            <div className="new-messsage">
              <span>1</span>
            </div>
          )}
        </div>
        <div className="status">
          <i className={`icon ${user.connected ? "connected" : ""}`}></i>
          <span>{user.connected ? "online" : "offline"}</span>
        </div>
      </div>
    </div>
  )
}
