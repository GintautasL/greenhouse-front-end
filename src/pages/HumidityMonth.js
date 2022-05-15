import * as React from "react"
import Paper from "@mui/material/Paper"
import Container from "@mui/material/Container"
import { getHumidityMonthRequest } from "../requests"
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
import { getDayAxisValue } from "../utils"

const useFetch = (date) => {
  const [loading, setLoading] = useState(true)
  const [humidity, setHumidity] = useState([])
  const query = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  }

  const getHumidity = async () => {
    const humidity = await getHumidityMonthRequest(query)
    const processedHumidityData = humidity.map((item) => {
      return { ...item, dayAxisValue: getDayAxisValue(item.created_at) }
    })
    const fakeData = [
      ...processedHumidityData,
      {
        dayAxisValue: getDaysInMonth(new Date(query.year, query.month - 1)),
        humidity: {},
      },
      {
        dayAxisValue: 1,
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

export const HumidityMonthComponent = ({ humidity, value, setValue }) => {
  humidity.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })

  return (
    <Container maxWidth="xl" sx={{ marginTop: 3 }}>
      <Paper>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} ml={2}>
            <DatePicker
              views={["month", "year"]}
              label="Pasirinkti mėnesį"
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
          <LineSeries valueField="humidity" argumentField="dayAxisValue" />
          <Title text="Mėnesio Drėgnumo statistika" />
        </Chart>
      </Paper>
    </Container>
  )
}

export const HumidityMonth = () => {
  const [value, setValue] = useState(new Date())
  const { loading, humidity } = useFetch(value)
  console.log(loading, humidity, value)
  console.log("test")

  return !loading ? (
    <HumidityMonthComponent
      humidity={humidity}
      value={value}
      setValue={setValue}
    />
  ) : (
    <SimpleBackdrop />
  )
}
