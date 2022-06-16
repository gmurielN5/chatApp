import { useContext } from "react"
import { context } from "./context"

const { Outlet, Navigate } = require("react-router")

const useAuth = () => {
  const { user } = useContext(context)
  return user && user.loggedIn
}

const PrivateRoutes = () => {
  const isAuth = useAuth()
  return isAuth ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoutes
