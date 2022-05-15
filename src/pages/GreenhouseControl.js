import * as React from "react"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { LinearProgress, linearProgressClasses, Paper } from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { useEffect, useState } from "react"
import Chip from "@mui/material/Chip"
import SimpleBackdrop from "./BackDrop"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Tooltip from "@mui/material/Tooltip"

import {
  greenhouseControlRequest,
  editGreenhouseControlRequest,
  toggleTemperatureAuto,
  toggleHumidityAuto,
  toggleFans,
  toggleLight,
  toggleWater,
} from "../requests"
import { styled } from "@material-ui/system"

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}))

const schema = yup.object().shape({
  max_temperature: yup
    .number()
    .positive("Temperatūra turi būti teigiama")
    .integer("Įveskite sveiką skaičių")
    .min(20, "Mažiausia temperatūra 20 laipsnių")
    .typeError("Laukas privalomas"),
  min_humidity: yup
    .number()
    .positive("Drėgnumas turi būti teigiamas")
    .max(80, "Didžiausias galimas drėgnumas 80%")
    .typeError("Laukas privalomas"),
})

const useFetch = () => {
  const [loading, setLoading] = useState(true)
  const [greenhouseControl, setGreenhouseControl] = useState({})

  const getGreenhouseControl = async () => {
    const greenhouseControl = await greenhouseControlRequest()
    setGreenhouseControl(greenhouseControl)
    setLoading(false)
  }

  useEffect(() => {
    getGreenhouseControl()
  }, [])
  return { loading, greenhouseControl }
}

export const GreenhouseControlComponent = ({ greenhouseControl }) => {
  const [lightLoading, setLightLoading] = useState(false)
  const [fansLoading, setFansLoading] = useState(false)
  const [waterLoading, setWaterLoading] = useState(false)
  const [temperatureLoading, setTemperatureLoading] = useState(false)
  const [humidityLoading, setHumidityLoading] = useState(false)
  const [waterProgress, setWaterProgress] = useState(0)
  const { control, handleSubmit, formState, getValues } = useForm({
    mode: "onChange",
    defaultValues: {
      is_temperature_auto: greenhouseControl.is_temperature_auto,
      is_humidity_auto: greenhouseControl.is_humidity_auto,
      max_temperature: greenhouseControl.max_temperature,
      min_humidity: greenhouseControl.min_humidity,
      manual_fans: greenhouseControl.manual_fans,
      manual_light: greenhouseControl.manual_light,
      manual_water: greenhouseControl.manual_water,
      water_level: greenhouseControl.water_level,
      is_active: greenhouseControl.is_active,
    },
    resolver: yupResolver(schema),
  })
  const { isValid } = formState
  const chipColor = (data) => {
    if (data == 1) {
      return "success"
    } else {
      return "error"
    }
  }

  const chipText = (data) => {
    if (data == 1) {
      return "Įjungta"
    } else {
      return "Išjungta"
    }
  }

  const controllerChipText = (data) => {
    if (data == 1) {
      return "Įjungtas"
    } else {
      return "Išjugtas arba neveikia kažkuris sensorius"
    }
  }

  const wateringChipText = (data) => {
    if (data == 1) {
      return "Laistoma"
    } else {
      return "Palaistyti"
    }
  }

  const waterChipText = (data) => {
    if (data == 0) {
      return "Nėra vandens"
    }
    if (data == 1) {
      return "Beveik nėra vandens"
    }
    if (data == 2) {
      return "Vandens yra"
    }
  }

  const waterChipColor = (data) => {
    if (data == 0) {
      return "error"
    }
    if (data == 1) {
      return "warning"
    }
    if (data == 2) {
      return "success"
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    const finalData = { ...data }
    await editGreenhouseControlRequest(finalData)
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
            MANO ŠILTNAMIO KONTROLĖ
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <h2>Mikrovaldiklio būsena:</h2>
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="is_active"
                  control={control}
                  render={({ field }) => (
                    <Chip
                      data-testid="microcontroller"
                      label={controllerChipText(field.value)}
                      size="50px"
                      sx={{
                        height: 54,
                        fontSize: 16,
                        mt: 1,
                      }}
                      color={chipColor(field.value)}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid container>
                <Grid item xs={12} sx={{ padding: 0 }}>
                  <hr />
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ paddingLeft: 50 }}>
                <h2>Automatinė šiltnamio kontrolė:</h2>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="max_temperature"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      type="number"
                      autoComplete=""
                      name="max_temperature"
                      fullWidth
                      id="max_temperature"
                      label="Maksimali temperatūra"
                      autoFocus
                      error={fieldState?.invalid}
                      helperText={fieldState?.error?.message}
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={4} sx={{ paddingLeft: 50 }}>
                <Controller
                  name="is_temperature_auto"
                  control={control}
                  render={({ field }) => (
                    <Tooltip
                      title="Automatinė temperatūros palaikymo funkcija. Įjungus šiltnamyje bus palaikoma ne didesnė nei pasirinkta temperatūra"
                      placement="right"
                      arrow
                      followCursor="true"
                    >
                      <Button
                        data-testid="temperature-auto"
                        disabled={temperatureLoading}
                        variant="contained"
                        sx={{
                          height: 54,
                          width: 128,
                          fontSize: 16,
                        }}
                        color={chipColor(field.value)}
                        onClick={async (e) => {
                          setTemperatureLoading(true)
                          await toggleTemperatureAuto()
                          setTimeout(() => {
                            field.onChange(!field.value)
                            setTemperatureLoading(false)
                          }, 3000)
                        }}
                        {...field}
                      >
                        {chipText(field.value)}
                      </Button>
                    </Tooltip>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="min_humidity"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      type="number"
                      autoComplete=""
                      name="min_humidity"
                      fullWidth
                      id="min_humidity"
                      label="Minimalus drėgnumas"
                      autoFocus
                      error={fieldState?.invalid}
                      helperText={fieldState?.error?.message}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4} sx={{ paddingLeft: 50 }}>
                <Controller
                  name="is_humidity_auto"
                  control={control}
                  render={({ field }) => (
                    <Tooltip
                      title="Automatinė drėgmės palaikymo funkcija. Įjungus šiltnamyje bus palaikomas ne mažesnis nei pasirinktas žemės drėgnumas procentais"
                      placement="right"
                      arrow
                      followCursor="true"
                    >
                      <Button
                        data-testid="humidity-auto"
                        disabled={humidityLoading}
                        variant="contained"
                        sx={{
                          height: 54,
                          width: 128,
                          fontSize: 16,
                        }}
                        color={chipColor(field.value)}
                        onClick={async (e) => {
                          setHumidityLoading(true)
                          await toggleHumidityAuto()
                          setTimeout(() => {
                            field.onChange(!field.value)
                            setHumidityLoading(false)
                          }, 3000)
                        }}
                        {...field}
                      >
                        {chipText(field.value)}
                      </Button>
                    </Tooltip>
                  )}
                />
              </Grid>

              <Grid item xs={12} sx={{ paddingLeft: 50 }}>
                <h2>Rankinė šiltnamio kontrolė:</h2>
              </Grid>
              <Grid container>
                <Grid item xs={12} sx={{ padding: 0 }}>
                  <hr />
                </Grid>
              </Grid>
              <Grid container sx={{ padding: "0 20px" }}>
                <Grid item xs={6}>
                  <h3>Vėdinimo kontrolė</h3>
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="manual_fans"
                    control={control}
                    render={({ field }) => (
                      <Tooltip
                        title="Įjungti/Išjungti vėdinimą"
                        placement="top"
                        arrow
                        followCursor="true"
                      >
                        <Button
                          data-testid="manual-fans"
                          disabled={fansLoading}
                          variant="contained"
                          sx={{
                            height: 54,
                            width: 128,
                            fontSize: 16,
                            mt: 1,
                          }}
                          color={chipColor(field.value)}
                          onClick={async (e) => {
                            setFansLoading(true)
                            await toggleFans()
                            setTimeout(() => {
                              field.onChange(!field.value)
                              setFansLoading(false)
                            }, 3000)
                          }}
                          {...field}
                        >
                          {chipText(field.value)}
                        </Button>
                      </Tooltip>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sx={{ padding: 0 }}>
                  <hr />
                </Grid>
              </Grid>
              <Grid container sx={{ padding: "0 20px" }}>
                <Grid item xs={6}>
                  <h3>Šviesos kontrolė</h3>
                </Grid>
                <Grid item xs={4}>
                  <Controller
                    name="manual_light"
                    control={control}
                    render={({ field }) => (
                      <Tooltip
                        title="Įjungti/Išjungti šviesą"
                        placement="top"
                        arrow
                        followCursor="true"
                      >
                        <Button
                          data-testid="manual-light"
                          disabled={lightLoading}
                          variant="contained"
                          sx={{
                            height: 54,
                            width: 128,
                            fontSize: 16,
                            mt: 1,
                          }}
                          color={chipColor(field.value)}
                          onClick={async (e) => {
                            setLightLoading(true)
                            await toggleLight()
                            setTimeout(() => {
                              field.onChange(!field.value)
                              setLightLoading(false)
                            }, 3000)
                          }}
                          {...field}
                        >
                          {chipText(field.value)}
                        </Button>
                      </Tooltip>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sx={{ padding: 0 }}>
                  <hr />
                </Grid>
              </Grid>
              <Grid container sx={{ padding: "0 20px" }}>
                <Grid item xs={6}>
                  <h3>Laistymo kontrolė</h3>
                </Grid>
                <Grid item xs={3}>
                  <Controller
                    name="manual_water"
                    control={control}
                    render={({ field }) => (
                      <Tooltip
                        title="Paspaudus šiltnamis laistomas 5 sekundes"
                        placement="top"
                        arrow
                        followCursor="true"
                      >
                        <Button
                          data-testid="manual-water"
                          disabled={waterLoading}
                          variant="contained"
                          sx={{
                            height: 54,
                            width: 128,
                            fontSize: 16,
                            mt: 1,
                          }}
                          color={chipColor(field.value)}
                          onClick={async (e) => {
                            setWaterLoading(true)
                            await toggleWater()
                            setTimeout(() => {
                              field.onChange(!field.value)
                              const timer = setInterval(() => {
                                setWaterProgress((oldProgress) => {
                                  if (oldProgress === 100) {
                                    setWaterLoading(false)
                                    field.onChange(field.value)
                                    clearInterval(timer)
                                    return 0
                                  }
                                  return Math.min(oldProgress + 1, 100)
                                })
                              }, 60)
                            }, 3000)
                          }}
                          {...field}
                        >
                          {wateringChipText(field.value)}
                        </Button>
                      </Tooltip>
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <BorderLinearProgress
                    variant="determinate"
                    value={waterProgress}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sx={{ padding: 0 }}>
                  <hr />
                </Grid>
              </Grid>
              <Grid container sx={{ padding: "0 20px" }}>
                <Grid item xs={6}>
                  <h3>Vandens lygis</h3>
                </Grid>
                <Grid item xs={4}>
                  <Controller
                    name="water_level"
                    control={control}
                    render={({ field }) => (
                      <Chip
                        data-testid="water-level"
                        label={waterChipText(field.value)}
                        size="50px"
                        sx={{
                          height: 54,

                          fontSize: 16,
                          mt: 1,
                        }}
                        color={waterChipColor(field.value)}
                        {...field}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sx={{ padding: 0 }}>
                  <hr />
                </Grid>
              </Grid>

              <Button
                disabled={!isValid}
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, ml: "auto" }}
              >
                Patvirtinti pakeitimus
              </Button>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

export const GreenhouseControl = () => {
  const { loading, greenhouseControl } = useFetch()
  console.log(loading, greenhouseControl)

  return !loading ? (
    <GreenhouseControlComponent greenhouseControl={greenhouseControl} />
  ) : (
    <SimpleBackdrop />
  )
}
