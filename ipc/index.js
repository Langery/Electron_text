const electron = require('electron')
const ipc = electron.ipcRenderer

const asyncBtn = document.getElementById('asyncBtn')
const backIndex = document.getElementById('backIndex')
const closeWin = document.getElementById('closeWin')
asyncBtn.addEventListener('click', () => {
  ipc.send('async-message')
})
backIndex.addEventListener('click', () => {
  ipc.send('back-index')
})

ipc.on('async-reply', (event, arg) => {
  console.log(arg)
})

ipc.on('close-win', () => {
  window.close()
})
closeWin.addEventListener('click', () => {
  window.close()
})