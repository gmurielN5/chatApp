import React, { useState } from "react"

const AccountContext = React.createContext()

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    username: "",
    loggedIn: null,
  })
  const [players, setPlayers] = useState([])

  return (
    <AccountContext.Provider
      value={{
        user,
        setUser,
        players,
        setPlayers,
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}

export { AccountContext, UserContext }
