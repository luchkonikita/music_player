import app from 'app'
import ipc from 'ipc'
import {EventEmitter} from 'events'
import loadAuthWindow from './load_auth_window'
import loadMainWindow from './load_main_window'
import {loadData} from './data_actions'

// APP EVENTS
// 'main:check_credentials'    load credantials from fs, resolve with credentials data
// 'main:load_main_window'     load main window with credentials as a payload
// 'main:load_auth_window'     load auth window, fetch credentials, save them, resolve with credentials data
// 'renderer:data_request'     fetch user data from a renderer
// 'renderer:data_response'    response to previous request event

// LAUNCH APP
const emitter = new EventEmitter()

let windows = {
  mainWindow: null,
  authWindow: null
}

let userData = null

app.on('ready', () => {

  // GET DATA
  emitter.on('main:check_credentials', () => {
    const promise = loadData()
    promise.then(data => emitter.emit('main:load_main_window', data))
    promise.catch(() => emitter.emit('main:load_auth_window'))
  })

  // AUTHORIZE IF NEEDED
  emitter.on('main:load_main_window', (data) => {
    userData = data
    loadMainWindow(windows)
  })

  // OPEN MAIN WINDOW
  emitter.on('main:load_auth_window', () => {
    const promise = loadAuthWindow(windows)
    promise.then(data => {
      emitter.emit('main:load_main_window', data)
      if (windows.authWindow) {
        windows.authWindow.close()
      }
    })
  })

  // LISTEN TO IT'S REQUESTS
  ipc.on('renderer:data_request', (event) => {
    event.sender.send('renderer:data_response', userData)
  })

  // TRIGGER INITIAL EVENT
  emitter.emit('main:check_credentials')

})
