const BASE_URL = `http://localhost:8080`

export const urls = {
  login: `${BASE_URL}/login`,
  register: `${BASE_URL}/users`,
  logout: `${BASE_URL}/logout`,
  myProfile: `${BASE_URL}/user`,

  getUsers: `${BASE_URL}/users`,

  adminConfirmUser: `${BASE_URL}/users/:id/confirm`,
  greenhouseControlRequest: `${BASE_URL}/user/greenhouseControl`,
  getTemperatureMonth: `${BASE_URL}/statistics/temperature/month`,
  getTemperatureDay: `${BASE_URL}/statistics/temperature/day`,
  getHumidityMonth: `${BASE_URL}/statistics/humidity/month`,
  getHumidityDay: `${BASE_URL}/statistics/humidity/day`,
  getSoilHumidityMonth: `${BASE_URL}/statistics/soilHumidity/month`,
  getSoilHumidityDay: `${BASE_URL}/statistics/soilHumidity/day`,
  toggleTemperatureAuto: `${BASE_URL}/user/greenhouseControl/temperatureAuto`,
  toggleHumidityAuto: `${BASE_URL}/user/greenhouseControl/humidityAuto`,
  toggleFans: `${BASE_URL}/user/greenhouseControl/fans`,
  toggleLight: `${BASE_URL}/user/greenhouseControl/light`,
  toggleWater: `${BASE_URL}/user/greenhouseControl/water`,
  getToken: `${BASE_URL}/getToken`,
}
