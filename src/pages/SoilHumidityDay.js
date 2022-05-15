import * as React from "react"
import Paper from "@mui/material/Paper"
import Container from "@mui/material/Container"
import { getSoilHumidityDayRequest } from "../requests"
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
  const [soilHumidity, setSoilHumidity] = useState([])
  const query = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  }

  const getSoilHumidity = async () => {
    const soilHumidity = await getSoilHumidityDayRequest(query)
    const processedSoilHumidityData = soilHumidity.map((item) => {
      return { ...item, hourAxisValue: getHourAxisValue(item.created_at) }
    })
    const fakeData = [
      ...processedSoilHumidityData,
      {
        hourAxisValue: 24,
        soil_humidity: {},
      },
      {
        hourAxisValue: 1,
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

export const SoilHumidityDayComponent = ({ soilHumidity, value, setValue }) => {
  soilHumidity.sort((a, b) => {
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
        <Chart data={soilHumidity}>
          <ArgumentAxis></ArgumentAxis>
          <ValueAxis max={30}></ValueAxis>
          <LineSeries
            valueField="soil_humidity"
            argumentField="hourAxisValue"
          />
          <Title text="Dienos žemės drėgnumo statistika" />
        </Chart>
      </Paper>
    </Container>
  )
}

export const SoilHumidityDay = () => {
  const [value, setValue] = useState(new Date())
  const { loading, soilHumidity } = useFetch(value)
  console.log(loading, soilHumidity, value)
  console.log("test")

  return !loading ? (
    <SoilHumidityDayComponent
      soilHumidity={soilHumidity}
      value={value}
      setValue={setValue}
    />
  ) : (
    <SimpleBackdrop />
  )
}
