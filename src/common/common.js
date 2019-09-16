export function PostWay (sendData, urlnaem) {
  let options = {
    method: "POST", // Request way
    body: JSON.stringify(sendData),	 // Request body
    headers: { // Request header
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  const url = 'http://127.0.0.1:5000/' + urlnaem
  return fetch(url, options)
    // .then((response) => {
    //   response.json()
    // })
    .then((data) => {
      console.log(data)
      return (!data.username || !data.password) ? false : true
    })
    .catch((error) => { return error })
}
