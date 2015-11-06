export default function validateUserData(userData) {
  if (!userData.access_token || !userData.fetched_at) {
    return false
  }
  const date = new Date(userData.fetched_at)
  date.setSeconds(date.getSeconds() + 86400)
  return date > new Date()
}
