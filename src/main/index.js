import { app, dialog } from 'electron'
const log = require('electron-log')
log.transports.file.resolvePath = () => "/Users/linhnt/Library/Logs/test-build/logs/main.log"
log.info('Hello, log');

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

// Load here all startup windows
// require('./mainWindow')

import BrowserWinHandler from './BrowserWinHandler'
import path from "path";

const winHandler = new BrowserWinHandler({
  height: 600,
  width: 1000
})

log.info('process.defaultApp', process.defaultApp)
if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('testapp1', process.execPath, [path.resolve(process.argv[1])])
  }
} else {
  app.setAsDefaultProtocolClient('testapp1')
}

winHandler.onCreated(_browserWindow => {
  winHandler.loadPage('/')
  // Or load custom url
  // _browserWindow.loadURL('https://google.com')
})

app.on('open-url', (event, url) => {
  dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`)
})
