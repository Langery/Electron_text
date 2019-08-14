const electron = require('electron')
const ipc = electron.ipcRenderer
const loginBtn = document.getElementById('loginBtn')

var ajax = new XMLHttpRequest()


loginBtn.addEventListener('click', () => {
  ajax.open('GET', 'http://127.0.0.1:5000/first', true)
  ajax.send()
  ajax.onreadystatechange = () => {
    if (ajax.readyState == 4 && ajax.status == 200) {
      console.log(ajax.responseText)
      ipc.send('login-click')
    }
  }
})
