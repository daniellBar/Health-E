const axios = require('axios')

export const utilService = {
  getLocation,
  calcAvgRate,
  buildFilterBy,
  checkArraysValuesAreEqual,
  getQueryParamsStr,
  buildParamsObject
}

async function getLocation(address) {
  const API_KEY = 'AIzaSyCum5NI2ztcUbwjAyhLH98jAJHBK0gbugc';
  return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`)
    .then(res => {
      const addreess = {
        lat: res.data.results[0].geometry.location.lat,
        lng: res.data.results[0].geometry.location.lng,
        address: res.data.results[0].address_components[0].short_name
      }
      return addreess
    })
    .catch(() => console.log('NOTHING TO RETURN'))
}

function calcAvgRate(activity) {
  let tempSum = 0;
  const rates = activity.reviews.map(review => review.rate);
  tempSum = rates.reduce(function (acc, val) {
    return acc + val
  }, 0);
  return ((Math.round((tempSum / rates.length) * 100) / 100).toFixed(2));
}

function buildFilterBy(searchParams) {
  let filterBy = {}
  searchParams.forEach((value, key) => {
    if (filterBy.hasOwnProperty(key)) {
      let values = [filterBy[key]]
      values.push(value)
      filterBy = { ...filterBy, [key]: values }
    }
    else {
      filterBy = { ...filterBy, [key]: value }
    }
  })
  return filterBy
}

// this function assumes both are arrays.
// check if arrays in the function that calls this function
function checkArraysValuesAreEqual(_arr1, _arr2) {
  if (_arr1.length !== _arr2.length) {
    return false;
  }
  const arr1 = _arr1.concat().sort();
  const arr2 = _arr2.concat().sort();
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

function getQueryParamsStr() {
  const urlStr = window.location.href
  const queryParamsStr = (urlStr.indexOf('?') > -1) ? urlStr.substring(urlStr.indexOf('?') + 1) : ''
  return queryParamsStr
}


function buildParamsObject(queryParamsStr) {
  let params = {}
  const KeyValueStrsArray = queryParamsStr.split('&')
  console.log(KeyValueStrsArray);
  KeyValueStrsArray.forEach(keyValuePairStr => {
    const key = keyValuePairStr.split('=')[0]
    const value = keyValuePairStr.split('=')[1]
    if (params[key]) {
      let values
      if (Array.isArray(params[key])) {
        values = [...params[key]]
        values.push(value)
      }
      else {
        values = [params[key], value]
      }
      params[key] = values
    }
    else {
      params[key] = value
    }
  })
  return params
}