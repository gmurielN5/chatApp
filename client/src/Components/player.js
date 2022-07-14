import { useContext } from "react"
import { context } from "../context"
import "../Style/player.scss"

export const Player = ({ player }) => {
  const { setPlayers } = useContext(context)

  const handleClick = (selected) => {
    setPlayers((pevPlayers) => {
      return [...pevPlayers].map((player) => {
        if (player.userID === selected.userID) {
          player.selected = true
        } else {
          player.selected = false
        }
        return player
      })
    })
  }

  return (
    <div className={`${player.self ? "active" : ""}`}>
      <div
        onClick={() => handleClick(player)}
        className={`player ${player.selected ? "selected" : ""}`}
      >
        <div className="profile">
          <div className="name">
            <p>
              {player.username} {player.self ? " (yourself)" : ""}
            </p>
          </div>
          {player.hasNewMessage && (
            <div className="new-messsage">
              <span>1</span>
            </div>
          )}
        </div>
        <div className="status">
          <i className={`icon ${player.connected ? "connected" : ""}`}></i>
          <span>{player.connected ? "online" : "offline"}</span>
        </div>
      </div>
    </div>
  )
}
