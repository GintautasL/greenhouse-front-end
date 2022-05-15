import * as React from "react"
import { ROLES } from "../../constants"
import { Navigate, Outlet, Route } from "react-router-dom"

export const PrivateRoute = () => {
  const role = window.localStorage.getItem("role")

  return role == ROLES.admin || role == ROLES.user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  )
}
