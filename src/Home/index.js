const electron = require('electron')
const ipc = electron.ipcRenderer

var ajax = new XMLHttpRequest()

function loginFun (target) {
  target.onclick = () => {
    var sendData = 'langery'
    ajax.open('GET', 'http://127.0.0.1:5000/first?name=' + sendData, true)
    ajax.send()
    ajax.onreadystatechange = () => {
      if (ajax.readyState == 4 && ajax.status == 200) {
        sessionStorage.setItem('backInfo', ajax.responseText)
        ipc.send('login-click')
      }
    }
  }
}

function registerFun (target) {
  target.onclick = () => { ipc.send('register-click') }
}

function backFun (target) {
  target.onclick = () => { ipc.send('back-click') }
}

function sendIPC (target, sendAim) {
  target.onclick = () => { ipc.send(sendAim) }
}