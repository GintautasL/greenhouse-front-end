import * as React from "react"
import Paper from "@mui/material/Paper"
import Container from "@mui/material/Container"
import { getHumidityDayRequest } from "../requests"
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
  const [humidity, setHumidity] = useState([])
  const query = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  }

  const getHumidity = async () => {
    const humidity = await getHumidityDayRequest(query)
    const processedHumidityData = humidity.map((item) => {
      return { ...item, hourAxisValue: getHourAxisValue(item.created_at) }
    })
    const fakeData = [
      ...processedHumidityData,
      {
        hourAxisValue: 24,
        humidity: {},
      },
      {
        hourAxisValue: 1,
        humidity: {},
      },
    ]
    setHumidity(fakeData)
    setLoading(false)
  }

  useEffect(() => {
    getHumidity()
  }, [date])
  return { loading, humidity }
}

export const HumidityDayComponent = ({ humidity, value, setValue }) => {
  humidity.sort((a, b) => {
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
        <Chart data={humidity}>
          <ArgumentAxis></ArgumentAxis>
          <ValueAxis max={30}></ValueAxis>
          <LineSeries valueField="humidity" argumentField="hourAxisValue" />
          <Title text="Dienos drėgnumo statistika" />
        </Chart>
      </Paper>
    </Container>
  )
}

export const HumidityDay = () => {
  const [value, setValue] = useState(new Date())
  const { loading, humidity } = useFetch(value)
  console.log(loading, humidity, value)
  console.log("test")

  return !loading ? (
    <HumidityDayComponent
      humidity={humidity}
      value={value}
      setValue={setValue}
    />
  ) : (
    <SimpleBackdrop />
  )
}
