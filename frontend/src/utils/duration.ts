export const milisToSeconds = (milis: number) => {
  return Number(Math.floor((milis % 60000) / 1000).toFixed(0))
}

export const millisToMinutesAndSeconds = (millis: number) => {
  var minutes = Math.floor(millis / 60000)
  var seconds = milisToSeconds(millis)

  return minutes + ':' + (seconds < 10 ? 0 : '') + seconds
}

export const milisToHoursAndSeconds = (millis: number) => {
  const sec = millis / 1000
  const hours = Math.floor(sec / 3600)
  const minutes = Math.floor((sec - hours * 3600) / 60)

  let hoursString: string = String(hours)
  let minutesString: string = String(minutes)

  if (hours < 10) {
    hoursString = '0' + String(hours)
  }
  if (minutes < 10) {
    minutesString = '0' + String(minutes)
  }
  return `${hoursString}Hr ${minutesString}min`
}
