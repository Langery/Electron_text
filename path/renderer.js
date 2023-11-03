// 需要监测版本时可以直接在js文件中引入判定版本

const information = document.getElementById('info');
information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`

// ping

const func = async () => {
  const response = await window.versions.ping();
  console.log(response)
}

func()