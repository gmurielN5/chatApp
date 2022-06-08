import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { MainContext } from "../../context"

import "../../Style/home.scss"

export const Home = ({ socket }) => {
  const { setIsConnected } = useContext(MainContext)
  const [username, setUsername] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState(false)
  let navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username === "") {
      setError(true)
    } else {
      socket.auth = { username }
      socket.connect()
      setIsConnected(socket.connected)
      socket.on("connect_error", (err) => {
        if (err.message === "invalid username") {
          setMessage(true)
          setMessage(err.message)
        }
      })
      navigate("/private", { replace: true })
    }
  }
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        {message ? (
          <label>{message}</label>
        ) : (
          <label>Please enter all the fields</label>
        )}
      </div>
    )
  }
  return (
    <div className="homepage">
      <h1>Welcome </h1>
      {error && <div className="messages">{errorMessage()}</div>}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter your username"
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        ></input>

        <button type="submit">Enter</button>
      </form>
    </div>
  )
}
