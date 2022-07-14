import Sidebar from "../Components/Sidebar"
import { Chat } from "../Components/Chat"

import "../Style/home.scss"

export const Home = () => {
  return (
    <main className="homepage">
      <div className="left-panel">
        <Sidebar />
      </div>
      <div className="right-panel">
        <Chat />
      </div>
    </main>
  )
}
