const formatTime = (time: number) => {
  let hours = (Math.floor(time / 3600)).toString()
  if (hours.length === 1) hours = "0" + hours
  let minutes = (Math.floor((time - parseInt(hours) * 3600) / 60)).toString()
  if (minutes.length === 1) minutes = "0" + minutes
  let seconds = (time - parseInt(hours) * 3600 - parseInt(minutes) * 60).toString()
  if (seconds.length === 1) seconds = "0" + seconds
  if (hours !== "00") return `${hours}:${minutes}:${seconds}`
  else return `${minutes}:${seconds}`
}

export default formatTime