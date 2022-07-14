import { useContext } from "react"
import { context } from "../context"
import { ChatBox } from "./ChatBox"
import { Messages } from "./Messages"

import "../Style/chat.scss"

export const Chat = () => {
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
              {player.messages &&
                player.messages.map((msg, i) => (
                  <ul>
                    <Messages kery={i} msg={msg} />
                  </ul>
                ))}
            </div>
            <ChatBox player={player} key={player.userID} />
          </div>
        ) : null
      )}
    </>
  )
}
