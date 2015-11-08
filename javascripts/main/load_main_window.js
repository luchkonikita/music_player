import app from 'app'
import BrowserWindow from 'browser-window'

const isDevelopment = (process.env.NODE_ENV === 'development')

const windowSettings = {
  'width': (isDevelopment ? 1200 : 360),
  'height': 400,
  'resizable': false,
  'title-bar-style': 'hidden'
}

// main window should be passed and mutated to keep the reference
// otherwise it will be garbage-collected
export default function loadMainWindow(windows) {
  windows.mainWindow = new BrowserWindow(windowSettings)
  windows.mainWindow.loadUrl('file://' + app.getAppPath() + (isDevelopment ? '/index_dev.html' : '/index.html'))

  if (isDevelopment) {
    windows.mainWindow.openDevTools()
  }

  windows.mainWindow.on('closed', () => {
    windows.mainWindow = null
    app.quit()
  })
}
