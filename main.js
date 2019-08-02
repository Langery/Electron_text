const electron = require('electron') // 程序内置模块
const { app, BrowserWindow, Menu } = require('electron')
const ipc = electron.ipcMain
const dialog = electron.dialog
// 生命周期
var os = require('os')

function getCpu () {
  const cores = os.cpus()
  if (cores.length > 0) {
    // console.log(cores[0])
    return cores[0].model
  }
}

ipc.on('async-message', (event) => {
  dialog.showErrorBox('An error message', 'Demo of an error message')
  event.sender.send('async-reply', 'Main process opened the error dialog')
})

ipc.on('add', () => {
  let ipcPage = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  ipcPage.loadFile('./ipc/index.html')
})

ipc.on('back-index', createWindow)

let win

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // 加载 index.html
  win.loadFile('./src/index.html')

  // win.loadURL(`file://${__dirname}/index.html`)

  // 打开开发者工具
  win.webContents.openDevTools()

  win.on('close', () => {
    win = null
  })
}

// 创建浏览器窗口
app.on('ready', createWindow)

// 全部窗口关闭时退出
app.on('window-all-closed', () => {
  // darwin 苹果系统
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 重新创建窗口
app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

// =======================> root
const fs = require('fs')
const root = fs.readdirSync('/')
// console.log(root) // 获取 ‘/’ 和 ‘C:\’ 所有文件

// =======================> menu
/* const dockMenu = Menu.buildFromTemplate([
  {
    label: 'New Window',
    click () { console.log('New Window') }
  },
  {
    label: 'New Window with Settings',
    submenu: [
      { label: 'Basic' },
      { label: 'Pro' }
    ]
  },
  { label: 'New Command...' }
])
app.dock.setMenu(dockMenu) */