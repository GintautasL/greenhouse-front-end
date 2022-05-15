import axios from "axios"
import { urls } from "./config"
import queryString from "query-string"

//login request
export const loginRequest = (data) =>
  axios
    .post(urls.login, data)
    .then(async function (response) {
      console.log(response.data.token)
      window.localStorage.setItem("token", response.data.token)
      window.localStorage.setItem("refreshToken", response.data.refreshToken)
      const data = await myProfileRequest()
      window.localStorage.setItem(
        "role",
        data.roles[data.roles.length - 1].title
      )

      window.location.href = "/user/greenhouseControl"
    })
    .catch(function (error) {
      console.log(error)
    })

//register request
export const registerRequest = (data) =>
  axios
    .post(urls.register, data)
    .then(function (response) {
      window.location.href = "/login"
    })
    .catch(function (error) {
      console.log(error)
    })

//logout request
export const logoutRequest = (data) =>
  axios
    .post(urls.logout, data)
    .then(function (response) {
      window.localStorage.clear()
      window.location.href = "/login"
    })
    .catch(function (error) {
      console.log(error)
    })

//my profile request
export const myProfileRequest = (data) =>
  axios
    .get(urls.myProfile)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })

export const getTokenRequest = (data) =>
  axios
    .post(urls.getToken, data)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })

//get greenhouse control
export const greenhouseControlRequest = (data) =>
  axios
    .get(urls.greenhouseControlRequest)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })

//edit greenhouse control
export const editGreenhouseControlRequest = (data) =>
  axios
    .put(urls.greenhouseControlRequest, data)
    .then(function (response) {
      window.location.href = `/user/greenhouseControl`
    })
    .catch(function (error) {
      console.log(error)
    })

export const getAllUsers = (data) =>
  axios
    .get(urls.getUsers)
    .then(function (response) {
      console.log("response.data")
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })

//admin confirm user
export const adminConfirmUser = (id) =>
  axios
    .put(urls.adminConfirmUser.replace(":id", id))
    .then(function (response) {
      window.location.href = `/users`
    })
    .catch(function (error) {
      console.log(error)
    })

// get temperature month request
export const getTemperatureMonthRequest = (query) =>
  axios
    .get(`${urls.getTemperatureMonth}?${queryString.stringify(query)}`)
    .then(function (response) {
      console.log(response.data)
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })

//get temperature day request
export const getTemperatureDayRequest = (query) =>
  axios
    .get(`${urls.getTemperatureDay}?${queryString.stringify(query)}`)
    .then(function (response) {
      console.log(response.data)
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })

// get humidity month request
export const getHumidityMonthRequest = (query) =>
  axios
    .get(`${urls.getHumidityMonth}?${queryString.stringify(query)}`)
    .then(function (response) {
      console.log(response.data)
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })

//get humidity day request
export const getHumidityDayRequest = (query) =>
  axios
    .get(`${urls.getHumidityDay}?${queryString.stringify(query)}`)
    .then(function (response) {
      console.log(response.data)
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })

// get soil humidity month request
export const getSoilHumidityMonthRequest = (query) =>
  axios
    .get(`${urls.getSoilHumidityMonth}?${queryString.stringify(query)}`)
    .then(function (response) {
      console.log(response.data)
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })

//get soil humidity day request
export const getSoilHumidityDayRequest = (query) =>
  axios
    .get(`${urls.getSoilHumidityDay}?${queryString.stringify(query)}`)
    .then(function (response) {
      console.log(response.data)
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })

//all toggles
export const toggleTemperatureAuto = () =>
  axios
    .put(urls.toggleTemperatureAuto)
    .then(function (response) {})
    .catch(function (error) {
      console.log(error)
    })

export const toggleHumidityAuto = () =>
  axios
    .put(urls.toggleHumidityAuto)
    .then(function (response) {})
    .catch(function (error) {
      console.log(error)
    })

export const toggleFans = () =>
  axios
    .put(urls.toggleFans)
    .then(function (response) {})
    .catch(function (error) {
      console.log(error)
    })

export const toggleLight = () =>
  axios
    .put(urls.toggleLight)
    .then(function (response) {})
    .catch(function (error) {
      console.log(error)
    })

export const toggleWater = () =>
  axios
    .put(urls.toggleWater)
    .then(function (response) {})
    .catch(function (error) {
      console.log(error)
    })
