import jsonfile from 'jsonfile'
import app from 'app'

const dataPath = app.getPath('userData') + '/data.json'

function invalidToken(data) {
  if (!data.access_token || !data.fetched_at || !data.expires_in) {
    return true
  }
  const date = new Date(data.fetched_at)
  date.setSeconds(date.getSeconds() + data.expires_in)
  return date <= new Date()
}

export function loadData() {
  return new Promise((resolve, reject) => {
    jsonfile.readFile(dataPath, (err, data) => {
      (err || invalidToken(data)) ? reject() : resolve(data)
    })
  })
}

export function saveData(data) {
  const preparedData = Object.assign({}, data, {fetched_at: new Date()})

  return new Promise((resolve, reject) => {
    jsonfile.writeFile(dataPath, preparedData, (err) => {
      err ? reject() : resolve(preparedData)
    })
  })
}
