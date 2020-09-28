// common Js
export function PostWay (sendData, urlnaem) {	// common Js
  let options = {
    method: "POST", // Request way
    body: JSON.stringify(sendData),	 // Request body
    headers: { // Request header
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  const url = 'http://0.0.0.0:5000/' + urlnaem
  return [url, options]
}
