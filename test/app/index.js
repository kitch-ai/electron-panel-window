var { app, BrowserWindow } = require('electron')
var nativeExt = require('../../')
var path = require('path')

var mainWindow = null

app.on('ready', function () {
  mainWindow = new BrowserWindow({

    width: 100,
    minWidth: 100,
    minHeight: 100,
    fullscreenable: false,
    paintWhenInitiallyHidden: true,
    show: false,
    frame: false,
    transparent: true,
    // Hack below: https://github.com/electron/electron/issues/15008#issuecomment-497498135
    titleBarStyle: 'customButtonsOnHover',
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
  nativeExt.makePanel(mainWindow)
  mainWindow.setSize(100, 100)

  mainWindow.loadURL('file://' + __dirname + '/index.html')
  mainWindow.on('ready-to-show', function () {
    var stealFocus = false
    setTimeout(() => {
      setTimeout(() => {
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
      }, 2000)
    }, 2000)
  })
})

