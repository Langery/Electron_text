// Preload Script - 安全桥接渲染进程和主进程
const { contextBridge, ipcRenderer } = require('electron')

// 通过 contextBridge 安全地暴露 API 给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  // 发送消息给主进程
  send: (channel, data) => {
    ipcRenderer.send(channel, data)
  },

  // 接收主进程消息
  on: (channel, callback) => {
    const subscription = (event, ...args) => callback(...args)
    ipcRenderer.on(channel, subscription)
    return () => ipcRenderer.removeListener(channel, subscription)
  },

  // IPC 调用（异步）
  invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),

  // 示例：ping
  ping: () => ipcRenderer.invoke('ping'),

  // 错误日志: 渲染进程调用, 主进程写入 userData/logs/error.log
  writeErrorLog: (logEntry) => ipcRenderer.invoke('write-error-log', logEntry)
})

// 暴露平台信息
contextBridge.exposeInMainWorld('platform', {
  os: process.platform,
  versions: process.versions
})
