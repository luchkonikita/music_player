import BrowserWindow from 'browser-window'
import querystring from 'querystring'
import {saveData} from './data_actions'

const redirectUrl = 'https://oauth.vk.com/blank.html'
const authUrl = 'https://oauth.vk.com/authorize?' +
                'client_id=4770592&' +
                'display=page&' +
                'redirect_uri=https://oauth.vk.com/blank.html&' +
                'scope=audio&' +
                'response_type=token&v=5.37'

const windowSettings = {
  'width': 1000,
  'height': 600,
  'resizable': false,
  'title-bar-style': 'hidden'
}

function authDataLoaded(urlString) {
  return urlString.split('#')[0] === redirectUrl
}

function parseAuthData(urlString) {
  return querystring.parse(urlString.split('#')[1])
}

export default function loadAuthWindow(windows) {
  windows.authWindow = new BrowserWindow(windowSettings)

  return new Promise((resolve, reject) => {

    windows.authWindow.loadUrl(authUrl)
    windows.authWindow.webContents.on('did-finish-load', () => {
      const currentUrl = windows.authWindow.webContents.getUrl()

      if (authDataLoaded(currentUrl)) {
        const fetchedData = parseAuthData(currentUrl)

        saveData(fetchedData).then(() => {
          resolve(fetchedData)
        })
      }
    })
  })
}
