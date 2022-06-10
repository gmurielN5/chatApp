import { UserContext } from "./context"

import Views from "./Views"

function App() {
  return (
    <UserContext>
      <Views />
    </UserContext>
  )
}

export default App
