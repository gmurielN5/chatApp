import { Routes, Route } from "react-router-dom"

import PrivateRoutes from "./PrivateRoutes"
import { Login } from "./pages/Login"
import Home from "./pages/Home"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Home />} />
      </Route>
      <Route path="*" element={<Login />} />
    </Routes>
  )
}

export default App
