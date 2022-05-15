export const getDayAxisValue = (date_string) => {
  const MINUTES_IN_DAY = 1440
  const date = new Date(date_string)
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  return (day * MINUTES_IN_DAY + hour * 60 + minute) / MINUTES_IN_DAY
}

export const getHourAxisValue = (date_string) => {
  const date = new Date(date_string)
  const hour = date.getHours()
  const minute = date.getMinutes()
  return (hour * 60 + minute) / 60
}
