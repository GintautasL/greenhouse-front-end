import { render } from "react-dom"
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Microcontroller } from "./pages/Microcontroller"
import { Users } from "./pages/Users"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import * as Interceptors from "./interceptors"
import { MainLayout } from "./layouts/MainLayout"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import { PrivateRoute } from "./components/Routes/PrivateRoute"
import { AdminRoute } from "./components/Routes/AdminRoute"
import { GreenhouseControl } from "./pages/GreenhouseControl"
import { TemperatureMonth } from "./pages/TemperatureMonth"
import { TemperatureDay } from "./pages/TemperatureDay"
import { HumidityMonth } from "./pages/HumidityMonth"
import { HumidityDay } from "./pages/HumidityDay"
import { SoilHumidityDay } from "./pages/SoilHumidityDay"
import { SoilHumidityMonth } from "./pages/SoilHumidityMonth"

const theme = createTheme()

const rootElement = document.getElementById("root")
render(
  <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<PrivateRoute />}>
              <Route path="/user" element={<Microcontroller />} />
            </Route>
            <Route path="/users" element={<AdminRoute />}>
              <Route path="/users" element={<Users />} />
            </Route>
            <Route path="/user/greenhouseControl" element={<PrivateRoute />}>
              <Route
                path="/user/greenhouseControl"
                element={<GreenhouseControl />}
              />
            </Route>
            <Route
              path="/statistics/temperature/month"
              element={<PrivateRoute />}
            >
              <Route
                path="/statistics/temperature/month"
                element={<TemperatureMonth />}
              />
            </Route>
            <Route
              path="/statistics/temperature/day"
              element={<PrivateRoute />}
            >
              <Route
                path="/statistics/temperature/day"
                element={<TemperatureDay />}
              />
            </Route>
            <Route path="/statistics/humidity/month" element={<PrivateRoute />}>
              <Route
                path="/statistics/humidity/month"
                element={<HumidityMonth />}
              />
            </Route>
            <Route path="/statistics/humidity/day" element={<PrivateRoute />}>
              <Route
                path="/statistics/humidity/day"
                element={<HumidityDay />}
              />
            </Route>
            <Route
              path="/statistics/soilHumidity/month"
              element={<PrivateRoute />}
            >
              <Route
                path="/statistics/soilHumidity/month"
                element={<SoilHumidityMonth />}
              />
            </Route>
            <Route
              path="/statistics/soilHumidity/day"
              element={<PrivateRoute />}
            >
              <Route
                path="/statistics/soilHumidity/day"
                element={<SoilHumidityDay />}
              />
            </Route>

            <Route path="*" element={<div>404 not found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  </ThemeProvider>,
  rootElement
)
