import * as React from "react"
import Paper from "@mui/material/Paper"
import Container from "@mui/material/Container"
import { getSoilHumidityMonthRequest } from "../requests"
import { useState, useEffect } from "react"
import { getDaysInMonth } from "date-fns"
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
  const [soilHumidity, setSoilHumidity] = useState([])
  const query = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  }

  const getSoilHumidity = async () => {
    const soilHumidity = await getSoilHumidityMonthRequest(query)
    const processedSoilHumidityData = soilHumidity.map((item) => {
      return { ...item, dayAxisValue: getDayAxisValue(item.created_at) }
    })
    const fakeData = [
      ...processedSoilHumidityData,
      {
        dayAxisValue: getDaysInMonth(new Date(query.year, query.month - 1)),
        soil_humidity: {},
      },
      {
        dayAxisValue: 1,
        soil_humidity: {},
      },
    ]

    setSoilHumidity(fakeData)
    setLoading(false)
  }

  useEffect(() => {
    getSoilHumidity()
  }, [date])
  return { loading, soilHumidity }
}

export const SoilHumidityMonthComponent = ({
  soilHumidity,
  value,
  setValue,
}) => {
  soilHumidity.sort((a, b) => {
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
        <Chart data={soilHumidity}>
          <ArgumentAxis></ArgumentAxis>
          <ValueAxis max={30}></ValueAxis>
          <LineSeries valueField="soil_humidity" argumentField="dayAxisValue" />
          <Title text="Mėnesio Žemės Drėgnumo statistika" />
        </Chart>
      </Paper>
    </Container>
  )
}

export const SoilHumidityMonth = () => {
  const [value, setValue] = useState(new Date())
  const { loading, soilHumidity } = useFetch(value)
  console.log(loading, soilHumidity, value)
  console.log("test")

  return !loading ? (
    <SoilHumidityMonthComponent
      soilHumidity={soilHumidity}
      value={value}
      setValue={setValue}
    />
  ) : (
    <SimpleBackdrop />
  )
}
