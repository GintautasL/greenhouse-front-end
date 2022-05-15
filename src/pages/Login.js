import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { useForm, Controller } from "react-hook-form"
import { loginRequest } from "../requests"
import { Paper } from "@mui/material"
import { useEffect } from "react"

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Greenhouse
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

export const Login = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  })
  const onSubmit = handleSubmit(async (data) => {
    await loginRequest(data)
  })

  useEffect(() => {
    const token = window.localStorage.getItem("token")
    if (token) {
      window.location.href = "/"
    }
  }, [])

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: 1,
      }}
    >
      <Paper elevation={3} sx={{ padding: "24px" }}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Prisijungti
          </Typography>
          <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Naudotojo vardas"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  {...field}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Slaptažodis"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  {...field}
                />
              )}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Prisijungti
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Registruotis"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Paper>
    </Container>
  )
}
