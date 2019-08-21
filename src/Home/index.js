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

function sendIPC (target, sendAim) {
  target.onclick = () => { ipc.send(sendAim) }
}

function onLogin (target, name, pwd) {
  target.onclick = () => {
    var username = name.value
    var password = pwd.value
    // console.log(username, password)
    // ajax.open('GET', 'http://127.0.0.1:5000/login?username=' + username + '&password=' + password, true)
    // ajax.send()
    // ajax.onreadystatechange = () => {
    //   if (ajax.readyState == 4 && ajax.status == 200) {
    //     console.log(ajax.responseText)
    //   }
    // }
    // var sendPost = {
    //   name: name.value,
    //   password: pwd.value
    // }
    ajax.open('POST', 'http://127.0.0.1:5000/login', true)
    ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
    ajax.send('name=' + name.value + '&password=' + pwd.value)
    ajax.onreadystatechange = () => {
      if (ajax.readyState == 4 && ajax.status == 200) {
        console.log(ajax.responseText)
      }
    }
  }
}