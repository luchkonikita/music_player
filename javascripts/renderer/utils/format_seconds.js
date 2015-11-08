const SECONDS_IN_HOUR = 3600
const SECONDS_IN_MINUTE = 60

function formatUnit(val) {
  const intValue = parseInt(val)
  return (intValue >= 10 ? intValue.toString() : `0${intValue}`)
}

export default function formatSeconds(seconds) {
  // const fullHours = Math.floor(seconds / SECONDS_IN_HOUR)
  // const extraMinutes = seconds % SECONDS_IN_HOUR
  const fullMinutes = Math.floor(seconds / SECONDS_IN_MINUTE)
  const extraSeconds = seconds % SECONDS_IN_MINUTE

  return [formatUnit(fullMinutes),
          formatUnit(extraSeconds)].join(':')
}
