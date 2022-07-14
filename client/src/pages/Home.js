import Sidebar from "../Components/Sidebar"
import { Message } from "../Components/Message"

import "../Style/home.scss"

export const Home = () => {
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
