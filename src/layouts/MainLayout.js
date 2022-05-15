import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { useForm, Controller } from "react-hook-form"
import { loginRequest } from "../requests"
import { Paper } from "@mui/material"
import { Header } from "../components/Header"
import { Outlet } from "react-router-dom"

export const MainLayout = () => {
  const token = window.localStorage.getItem("token")
  if (token) {
    return (
      <Box sx={{ backgroundColor: "rgb(202, 202, 202)" }}>
        <Header />
        <Outlet />
      </Box>
    )
  }
  return <Outlet />
}
