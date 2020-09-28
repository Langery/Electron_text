import config from '../config/index'

export function PostWay (sendData, urlnaem) {
  let options = {
    method: "POST", // Request way
    body: JSON.stringify(sendData),	 // Request body
    headers: { // Request header
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  const url = config.website.url + urlnaem
  return [url, options]
}
