var { app, BrowserWindow } = require('electron')
var nativeExt = require('../../')
var path = require('path')

var mainWindow = null

app.on('ready', function () {
  mainWindow = new BrowserWindow({
    width: 0,
    height: 0,
    fullscreenable: false,
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
  mainWindow.on('ready-to-show', function () {
    var stealFocus = false
    function show() {
      if (stealFocus) {
        nativeExt.makeKeyWindow(mainWindow)
        mainWindow.show()
      } else {
        nativeExt.makePanel(mainWindow)
        mainWindow.showInactive()
        nativeExt.makeKeyWindow(mainWindow)
      }

      // stealFocus = !stealFocus
      setTimeout(hide, 3000)
    }
    function hide() {
      mainWindow.hide()
      setTimeout(show, 3000)
    }
    show()
  })
})

