import { useContext } from "react"
import { context } from "./context"

const { Outlet, Navigate } = require("react-router")

const PrivateRoutes = () => {
  const { user } = useContext(context)

  return user.loggedIn ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoutes
