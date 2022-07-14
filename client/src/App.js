import { useContext } from "react"
import useSocket from "./useSocket"
import { context } from "./context"
import { Login } from "./pages/Login"
import { Home } from "./pages/Home"

function App() {
  useSocket()
  const { socket, isLoggedIn, players } = useContext(context)
  console.log(socket)
  console.log(players)

  return <>{isLoggedIn ? <Home /> : <Login />}</>
}

export default App
