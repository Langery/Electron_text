const electron = require('electron')
const ipc = electron.ipcRenderer
const dumpIpc = document.getElementById('dumpIpc')

dumpIpc.addEventListener('click', () => {
  ipc.send('add')
})