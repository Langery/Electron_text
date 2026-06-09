// Electron Config - Updated Version
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

let win = null

function createWindow() {
  // 创建窗口
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    // macOS 专属配置
    titleBarStyle: 'hiddenInset',
    show: false
  })

  // 根据环境加载不同的URL
  const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged

  if (isDev) {
    // 开发模式：加载 Vite 开发服务器
    win.loadURL('http://localhost:5174')
    // 开发模式下打开 DevTools
    win.webContents.openDevTools()
  } else {
    // 生产模式：加载打包后的文件
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  // 窗口准备好后显示，避免闪烁
  win.once('ready-to-show', () => {
    win.show()
  })

  // 监听渲染进程错误
  win.webContents.on('render-process-gone', (event, details) => {
    console.error('渲染进程崩溃:', details)
  })

  win.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('页面加载失败:', errorCode, errorDescription)
  })

  // 关闭窗口
  win.on('closed', () => {
    win = null
  })
}

// 应用准备就绪
app.whenReady().then(() => {
  createWindow()

  // IPC 通信示例
  ipcMain.handle('ping', () => 'pong')

  // 错误日志: 渲染进程 -> 主进程 -> 写入文件
  // 日志路径: ~/Library/Application Support/electron-ant/logs/error.log (macOS)
  //         %APPDATA%\electron-ant\logs\error.log (Windows)
  //         ~/.config/electron-ant/logs/error.log (Linux)
  ipcMain.handle('write-error-log', (event, logEntry) => {
    try {
      const logDir = path.join(app.getPath('userData'), 'logs')
      if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true })
      const logPath = path.join(logDir, 'error.log')
      const line = `[${new Date().toISOString()}] ${logEntry}\n`
      fs.appendFileSync(logPath, line, 'utf-8')
    } catch (err) {
      console.error('写入错误日志失败:', err)
    }
  })

  // macOS 激活应用
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// 所有窗口关闭
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
