import app from 'app'
import BrowserWindow from 'browser-window'

const windowSettings = {
  'width': 1000,
  'height': 600,
  'resizable': false,
  'title-bar-style': 'hidden'
}

// main window should be passed and mutated to keep the reference
// otherwise it will be garbage-collected
export default function loadMainWindow(data, mainWindow) {
  mainWindow = new BrowserWindow(windowSettings)
  mainWindow.loadUrl('file://' + __dirname + '/index.html')
  mainWindow.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
    app.quit()
  })
}
