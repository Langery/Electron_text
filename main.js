const { app, BrowserWindow, Menu } = require('electron')
var os = require('os')

function getCpu () {
  const cores = os.cpus()
  if (cores.length > 0) {
    console.log(cores[0])
    return cores[0].model
  }
}

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
console.log(root) // 获取 ‘/’ 和 ‘C:\’ 所有文件

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