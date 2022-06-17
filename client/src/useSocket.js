import { useEffect, useContext } from "react"
import { context } from "./context"

// import socket from "./socket"

const useSocket = () => {
  const { socket, user, setUser, players, setPlayers } = useContext(context)
  const { username } = user

  useEffect(() => {
    socket.auth = { username }
    socket.connect()
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
      console.log(users)
      users.forEach((user) => {
        let newUser = {
          ...user,
          self: user.userID === socket.id,
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
      console.log(content)
      console.log(from)
    })
    socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        setUser({ loggedIn: false })
      }
    })
    return () => {
      socket.off("connect")
      socket.off("disconnect")
      socket.off("users")
      socket.off("connect_error")
    }
  }, [socket, username, setUser, players, setPlayers])
}

export default useSocket
