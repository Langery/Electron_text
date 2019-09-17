export function PostWay (sendData, urlnaem) {
  let options = {
    method: "POST", // Request way
    body: JSON.stringify(sendData),	 // Request body
    headers: { // Request header
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  const url = 'http://127.0.0.1:5000/' + urlnaem
  fetch(url, options)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log(data)
      return new Promise((res, rej) => {
        res(data.backData)
      }).then((data) => {
        return data ? Promise.resolve(data) : Promise.reject(data)
      })
      // return data.backData ? true : false
      // return data.backData ? Promise.resolve(data.backData): Promise.reject(data.backData)
    })
    .catch((error) => { return error })
}
