import { useEffect, useContext } from "react"
import { context } from "./context"

// import socket from "./socket"

const useSocket = () => {
  const { socket, user, setUser, players, setPlayers } = useContext(context)
  const { sessionID } = user

  useEffect(() => {
    console.log(user)
    //check if there is a token in user state
    if (sessionID) {
      socket.auth = { sessionID }
      socket.connect()
      setUser((prevState) => {
        return {
          ...prevState,
          loggedIn: true,
        }
      })
    }

    socket.on("session", ({ sessionID, userID }) => {
      // attach the session ID to the next reconnection attempts
      socket.auth = { sessionID }
      // store session in the localStorage
      localStorage.setItem("sessionID", sessionID)
      //save the ID of the user
      socket.userID = userID
      setUser((prevState) => {
        return {
          ...prevState,
          sessionID,
        }
      })
    })

    socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        console.log(err.message)
        setUser({ loggedIn: false })
      }
    })
    //todo socket connect and disconnect doesn t work
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
      setUser({ loggedIn: false })
    })
    socket.on("users", (users) => {
      users.forEach((user) => {
        let newUser = {
          ...user,
          self: user.userID === socket.id,
          selected: false,
          message: [],
          hasNewmessage: false,
        }
        setPlayers((players) => [...players, newUser])
      })

      // put the current user first, and then sort by username
    })
    socket.on("new user connected", (user) => {
      // push new user to list of users
      setPlayers((players) => [...new Set([...players, user])])
    })
    socket.on("private message", ({ content, from }) => {
      //todo push message to from
      setPlayers((prevState) => {
        const updatePlayer = prevState.map((obj) => {
          if (obj.userID === from) {
            console.log(obj)

            return {
              ...obj,
              hasNewmessage: true,
              message: [{ content, fromSelf: false }],
            }
          }
          return obj
        })
        return updatePlayer
      })
    })

    return () => {
      socket.off("connect")
      socket.off("disconnect")
      socket.off("users")
      socket.off("new user connected")
      socket.off("private message")
      socket.off("connect_error")
    }
  }, [socket, user, sessionID, setUser, players, setPlayers])
}

export default useSocket
