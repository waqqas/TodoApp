// a library to wrap and simplify api calls
import {Platform} from 'react-native'
import apisauce from 'apisauce'

import AppConfig from '../Config/AppConfig'

// our "constructor"
const create = (baseURL = AppConfig.apiBaseUrl) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      'X-App-Version': '1.0.0',
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
    },
    // 10 second timeout...
    timeout: 10000
  })


  return {
    setHeader: api.setHeader,
  }
}

// let's return back our create method as the default.
export default {
  create
}
