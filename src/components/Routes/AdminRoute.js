import * as React from "react"
import { ROLES } from "../../constants"
import { Navigate, Outlet, Route } from "react-router-dom"

export const AdminRoute = () => {
  const role = window.localStorage.getItem("role")

  return role == ROLES.admin ? (
    <Outlet />
  ) : (
    <Navigate to="/user/greenhouseControl" />
  )
}
