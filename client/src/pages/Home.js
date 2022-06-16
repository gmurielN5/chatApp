import useSocket from "../useSocket"

import Sidebar from "../Components/Sidebar"
import { Message } from "../Components/Message"

import "../Style/home.scss"

const Home = () => {
  useSocket()

  return (
    <main className="homepage">
      <div className="left-panel">
        <Sidebar />
      </div>
      <div className="right-panel">
        <Message />
      </div>
    </main>
  )
}

export default Home
