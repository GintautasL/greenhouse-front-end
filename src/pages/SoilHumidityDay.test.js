import React from "react"
import { mount, shallow } from "enzyme"
import { SoilHumidityDayComponent, SoilHumidityDay } from "./SoilHumidityDay"
import { ThemeProvider } from "@material-ui/core"
import { theme } from "../test_utils/theme"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import axios from "axios"
import MockAdapter from "axios-mock-adapter"

const date = new Date()

const originalGetBBox = SVGElement.prototype.getBBox
beforeEach(
  () =>
    (SVGElement.prototype.getBBox = () => {
      return { width: 100, height: 100, x: 10, y: 10 }
    })
)
afterEach(() => (SVGElement.prototype.getBBox = originalGetBBox))

describe("<SoilHumidityDayComponent />", () => {
  it("renders component without crashing", () => {
    mount(
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <SoilHumidityDayComponent
            soilHumidity={[
              {
                id: 20463,
                user_id: 13,
                soil_humidity: 54.4,
                created_at: "2022-04-25 00:00:39",
                updated_at: "2022-04-25 00:00:39",
              },
              {
                id: 20464,
                user_id: 13,
                soil_humidity: 54.4,
                created_at: "2022-04-25 00:01:39",
                updated_at: "2022-04-25 00:01:39",
              },
            ]}
            value={date}
            setValue={jest.fn()}
          />
        </LocalizationProvider>
      </ThemeProvider>
    )
  })

  it("renders selected component without crashing", async () => {
    const mock = new MockAdapter(axios)
    mock.onGet().reply(function (config) {
      console.log(config.data)
      console.log(config)
      const date = new Date()
      const query = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
      }
      const url = new URL(config.url)
      const params = new URLSearchParams(url)
      expect(params.get("year")).toEqual(query.year)
      expect(params.get("month")).toEqual(query.month)
      expect(params.get("day")).toEqual(query.day)
      return [200, {}]
    })
    mount(
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <SoilHumidityDay />
        </LocalizationProvider>
      </ThemeProvider>
    )
    mock.reset()
  })
})
