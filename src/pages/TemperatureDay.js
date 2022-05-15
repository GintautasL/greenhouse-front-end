import * as React from "react"
import Paper from "@mui/material/Paper"
import Container from "@mui/material/Container"
import { getTemperatureDayRequest } from "../requests"
import { useState, useEffect } from "react"
import SimpleBackdrop from "./BackDrop"
import {
  Chart,
  LineSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui"
import DatePicker from "@mui/lab/DatePicker"
import { TextField } from "@mui/material"
import Grid from "@mui/material/Grid"
import { getHourAxisValue } from "../utils"

const useFetch = (date) => {
  const [loading, setLoading] = useState(true)
  const [temperature, setTemperature] = useState([])
  const query = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  }

  const getTemperature = async () => {
    const temperature = await getTemperatureDayRequest(query)
    const processedTemperatureData = temperature.map((item) => {
      return { ...item, hourAxisValue: getHourAxisValue(item.created_at) }
    })
    const fakeData = [
      ...processedTemperatureData,
      {
        hourAxisValue: 24,
        temperature: {},
      },
      {
        hourAxisValue: 1,
        temperature: {},
      },
    ]
    setTemperature(fakeData)
    setLoading(false)
  }

  useEffect(() => {
    getTemperature()
  }, [date])
  return { loading, temperature }
}

export const TemperatureDayComponent = ({ temperature, value, setValue }) => {
  temperature.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })

  return (
    <Container maxWidth="xl" sx={{ marginTop: 3 }}>
      <Paper>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} ml={2}>
            <DatePicker
              label="Pasirinkti dieną"
              minDate={new Date("2022-01-01")}
              maxDate={new Date("2033-06-01")}
              value={value}
              onChange={(newValue) => {
                setValue(newValue)
              }}
              renderInput={(params) => (
                <TextField {...params} helperText={null} />
              )}
            />
          </Grid>
        </Grid>
        <Chart data={temperature}>
          <ArgumentAxis></ArgumentAxis>
          <ValueAxis showLine></ValueAxis>
          <LineSeries
            valueField="temperature"
            argumentField="hourAxisValue"
            color="red"
          />
          <Title text="Dienos Temperatūros statistika" />
        </Chart>
      </Paper>
    </Container>
  )
}

export const TemperatureDay = () => {
  const [value, setValue] = useState(new Date())
  const { loading, temperature } = useFetch(value)
  console.log(loading, temperature, value)
  console.log("test")

  return !loading ? (
    <TemperatureDayComponent
      temperature={temperature}
      value={value}
      setValue={setValue}
    />
  ) : (
    <SimpleBackdrop />
  )
}
