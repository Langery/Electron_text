import config from '../config/index'

export function PostWay (urlname, sendData) {
  const options = {
    method: 'POST',
    body: JSON.stringify(sendData),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const url = config.baseUrl.dev + urlname
  return [url, options]
}

export function GetWay (urlname, ...sendData) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const data = sendData[0]
  let endUrl = ''
  for (const i in data) endUrl += `&${i}=${encodeURIComponent(data[i])}`
  endUrl = endUrl.substr(1)
  const url = config.baseUrl.dev + urlname + `?${endUrl}`
  return [url, options]
}

