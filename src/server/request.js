import config from '../config/index'

export function PostWay (urlname, sendData) {
  let options = {
    method: "POST", // Request way
    body: JSON.stringify(sendData),	 // Request body
    headers: { // Request header
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  // let options = new OptionsFun('POST', sendData);
  // options.PostOptions()
  const url = config.baseUrl.dev + urlname
  return [url, options]
}

export function GetWay (urlname, ...sendData) {
  let options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  const data = sendData[0]
  let endUrl = ''
  for (var i in data) endUrl += `&${i}=${data[i]}`
  endUrl = endUrl.substr(1)
  const url = config.baseUrl.dev + urlname + `?${endUrl}`
  return [url, options]
}

