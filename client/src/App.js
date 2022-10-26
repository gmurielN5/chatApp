import { useContext } from "react"
import useSocket from "./useSocket"
import { context } from "./context"
import { Login } from "./pages/Login"
import { Home } from "./pages/Home"

function App() {
  useSocket()
  const { isLoggedIn } = useContext(context)

  return <>{isLoggedIn ? <Home /> : <Login />}</>
}

export default App
