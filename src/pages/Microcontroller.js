import * as React from "react"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { Paper } from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { useEffect, useState } from "react"
import SimpleBackdrop from "./BackDrop"

import { myProfileRequest, getTokenRequest } from "../requests"

const useFetch = () => {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState({})

  const getProfile = async () => {
    const profile = await myProfileRequest()
    setProfile(profile)
    setLoading(false)
  }

  useEffect(() => {
    getProfile()
  }, [])
  return { loading, profile }
}

export const MicrocontrollerComponent = ({ profile }) => {
  const [token, setToken] = useState({ token: "" })

  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: profile.username,
      password: "",
      token: token.token,
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    const token = await getTokenRequest(data)
    setToken(token)
  })

  return (
    <Container
      component="main"
      maxWidth="md"
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
          <Typography component="h1" variant="h5">
            MIKROVALDIKLIS
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
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
                      label="Vartotojo vardas"
                      autoFocus
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      autoComplete="password"
                      name="password"
                      required
                      fullWidth
                      id="password"
                      type="password"
                      label="Slaptažodis"
                      autoFocus
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, ml: "auto" }}
              >
                Generuoti žetoną mikrovaldikliui
              </Button>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  value={!token.token ? "" : `Bearer ${token.token}`}
                  autoComplete="token"
                  name="token"
                  fullWidth
                  id="token"
                  label="Žetonas mikrovaldikliui"
                  autoFocus
                  multiline
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

export const Microcontroller = () => {
  const { loading, profile } = useFetch()
  console.log(loading, profile)

  return !loading ? (
    <MicrocontrollerComponent profile={profile} />
  ) : (
    <SimpleBackdrop />
  )
}
