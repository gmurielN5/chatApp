import { useContext } from "react"
import { context } from "../context"
import { Chat } from "./Chat"

import "../Style/message.scss"

export const Message = () => {
  const { players } = useContext(context)

  return (
    <>
      {players.map((player) =>
        player.selected ? (
          <div className="message-panel">
            <div className="header">
              <div className="name">
                <p>{player.username}</p>
              </div>
              <div className="status">
                <i
                  className={`icon ${player.connected ? "connected" : ""}`}
                ></i>
                <span>{player.connected ? "online" : "offline"}</span>
              </div>
            </div>
            <div className="message">
              <p>message</p>
            </div>
            <Chat player={player} />
          </div>
        ) : null
      )}
    </>
  )
}
