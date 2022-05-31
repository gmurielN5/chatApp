import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { MainContext } from "../../context"

import "../../Style/home.scss"

export const Home = () => {
  const { username, setUsername } = useContext(MainContext)

  console.log(username)
  return (
    <div className="homepage">
      <h1>Welcome </h1>
      <input
        placeholder="Enter your username"
        value={username}
        type="text"
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <Link to="/rooms">
        <button>Enter</button>
      </Link>
    </div>
  )
}
