var { app, BrowserWindow } = require('electron')
var nativeExt = require('../../')
var path = require('path')

var mainWindow = null

const toggle = () => {
  function show() {
    nativeExt.makePanel(mainWindow)
    mainWindow.showInactive()
    nativeExt.makeKeyWindow(mainWindow)
    setTimeout(hide, 3000)
  }

  function hide() {
    mainWindow.hide()
    setTimeout(show, 3000)
  }
  show()
}

const createPopupWindow = () => {
  mainWindow = new BrowserWindow({
    width: 0,
    height: 0,
    fullscreenable: true,
    paintWhenInitiallyHidden: true,
    show: false,
    frame: false,
    transparent: true,
    minimizable: false,
    maximizable: false,
    closable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      backgroundThrottling: false,
    },
  })
  mainWindow.setSize(200, 200)
  mainWindow.center()
  mainWindow.loadURL('file://' + __dirname + '/index.html')
}

app.on('ready', function () {
  createPopupWindow()
  mainWindow.on('ready-to-show', () => toggle())
})

