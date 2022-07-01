import useSocket from "./useSocket"
import Views from "./Views"

function App() {
  useSocket()
  return <Views />
}

export default App
