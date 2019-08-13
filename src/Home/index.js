const electron = require('electron')
const ipc = electron.ipcRenderer
const loginBtn = document.getElementById('loginBtn')

loginBtn.addEventListener('click', () => {
  ipc.send('login-click')
})
