import jsonfile from 'jsonfile'
import app from 'app'
import validateUserData from './validate_user_data'

const dataPath = app.getPath('userData') + '/data.json'

export function loadData() {
  return new Promise((resolve, reject) => {
    jsonfile.readFile(dataPath, (err, data) => {
      (err || !validateUserData(data)) ? reject() : resolve(data)
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
