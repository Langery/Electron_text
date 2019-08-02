const electron = require('electron')
const ipc = electron.ipcRenderer

const asyncBtn = document.getElementById('asyncBtn')
const backIndex = document.getElementById('backIndex')
asyncBtn.addEventListener('click', () => {
  ipc.send('async-message')
})
backIndex.addEventListener('click', () => {
  ipc.send('back-index')
})

ipc.on('async-reply', (event, arg) => {
  console.log(arg)
})