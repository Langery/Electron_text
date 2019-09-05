const { app, BrowserWindow } = require('electron')
let win
function createWindow() {
    // create new window
    win = new BrowserWindow({ width: 800, height: 600 })

    // onload index.html or url
    win.loadURL('http://localhost:3000')
    // win.loadFile('public/index.html')
    // load local files in build
    // win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`)  
    
    // open devTools
    win.webContents.openDevTools()
  
    // close window
    win.on('closed', () => {
        // cancel window object if want to support more window
        // send the more window object in a array
        // and delete the correspond elements
        win = null
    })
}

// Electron ready after init
// create the brower window to use the function
// some API after the ready function 
app.on('ready', createWindow)

// close the windows and quit
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (win === null) {
        createWindow()
    }
})

// 在这个文件中，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。