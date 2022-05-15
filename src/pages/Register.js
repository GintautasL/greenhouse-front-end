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

import { registerRequest } from "../requests"
import { Paper } from "@mui/material"
import { useForm, Controller } from "react-hook-form"
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
      <Link color="inherit" href="https://mui.com/">
        Greenhouse
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

export const Register = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  })
  const onSubmit = handleSubmit(async (data) => {
    const extendedData = { ...data }
    await registerRequest(extendedData)
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
            Registruotis
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      autoComplete="given-name"
                      name="username"
                      required
                      fullWidth
                      id="username"
                      label="Naudotojo vardas"
                      autoFocus
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Slaptažodis"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      {...field}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registruotis
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Prisijungti
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Paper>
    </Container>
  )
}
