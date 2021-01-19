
const API_URL = 'https://api2.bmob.cn/1/classes/';
const HEADER = {
  'X-Bmob-Application-Id': '089df87a586aac761a2feb9dbfbb0d7d',
  'X-Bmob-REST-API-Key': '5fcfb2bff65fa11220ba356839008e21',
  'Content-Type': 'application/json',
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
      return response;
  } else {
    throw new Error(response.statusText);
  }
}

function parseJSON(response) {
  return response && response.text().then(function (text) {
      return text ? JSON.parse(text) : {}
  })
}

export default function request(url, obj) {
  return fetch(API_URL + url, {
      ...obj,
      headers: Object.assign(HEADER, obj.header || {}),
    })
    .then(checkStatus)
    .then(parseJSON)
}

export function postData(url, obj) {
  return request(
    url, 
    {
      ...obj,
      method: 'POST',
    }
  )
}

export function getData(url, obj) {
  return request(
    url, 
    {
      ...obj,
      method: 'GET',
    }
  )
}