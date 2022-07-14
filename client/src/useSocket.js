import { useEffect, useContext } from "react"
import { context } from "./context"

const useSocket = () => {
  const { socket, sessionID, setIsLoggedIn, players, setPlayers } =
    useContext(context)

  useEffect(() => {
    socket.on("connect", () => {
      setPlayers((prevPlayers) => {
        return [...prevPlayers].map((player) => {
          if (player.self) {
            player.connected = true
          }
          return player
        })
      })
    })
    socket.on("disconnect", () => {
      setPlayers((prevPlayers) => {
        return [...prevPlayers].map((player) => {
          if (player.self) {
            player.connected = false
          }
          return player
        })
      })
    })
    //check if there is a token in user state
    if (sessionID) {
      socket.auth = { sessionID }
      socket.connect()
      setIsLoggedIn(true)
    }

    socket.on("session", ({ sessionID, userID }) => {
      // attach the session ID to the next reconnection attempts
      socket.auth = { sessionID }
      // store session in the localStorage
      localStorage.setItem("sessionID", sessionID)
      //save the ID of the user
      socket.userID = userID
    })

    socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        setIsLoggedIn(false)
      }
    })

    socket.on("users", (sessions) => {
      sessions.forEach((session) => {
        session.messages.forEach((message) => {
          message.fromSelf = message.from === socket.userID
        })
        setPlayers((prevState) => {
          const updatedPlayer = prevState.map((player) => {
            if (player.userID === session.userID) {
              return {
                ...player,
                connected: session.connected,
                messages: session.messages,
                hasNewMessage: false,
              }
            } else {
              return player
            }
          })
          return updatedPlayer
        })
        let newPlayer = {
          ...session,
          self: session.userID === socket.userID,
        }
        setPlayers((players) => [...players, newPlayer])
      })
    })

    socket.on("user connected", (session) => {
      setPlayers((prevState) => {
        const updatedPlayer = prevState.map((player) => {
          if (player.userID !== session.userID) {
            return { ...player, connected: session.connected }
          } else {
            return player
          }
        })
        return updatedPlayer
      })
      setPlayers((players) => [...players, session])
    })

    socket.on("user disconnected", (id) => {
      setPlayers((prevPlayers) => {
        return [...prevPlayers].map((player) => {
          if (player.userID === id) {
            player.connected = false
          }
          return player
        })
      })
    })

    socket.on("private message", ({ content, from, to }) => {
      setPlayers((prevState) => {
        return [...prevState].map((player) => {
          const fromSelf = socket.userID === from
          if (player.userID === (fromSelf ? to : from)) {
            player.messages.push({ content, fromSelf })
            player.hasNewMessage = true
            if (player !== player.selected) {
              player.hasNewMessages = true
            }
          }

          return player
        })
      })
    })

    return () => {
      socket.off("connect")
      socket.off("disconnect")
      socket.off("session")
      socket.off("connect_error")
      socket.off("users")
      socket.off("user connected")
      socket.off("user disconnected")
      socket.off("private message")
    }
  }, [socket, sessionID, setIsLoggedIn, players, setPlayers])
}

export default useSocket
