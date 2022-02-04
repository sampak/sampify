import axios from 'axios'
import * as userService from './user'

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL ?? 'http://localhost:4000',
  headers: {
    authorization: userService.getToken(),
  },
})

axiosInstance.interceptors.response.use(
  (config) => {
    return config
  },
  (error) => {
    if (error.response) {
      const code = error.response.status
      if (code === 401 || code === 403) {
        console.log('unathorized')
        // userService.removeToken()
      }
      throw error.response.data
    } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      console.log('Error without code')
      // console.log(error.request)
    } else {
      // Something happened in setting up the request and triggered an Error
      // console.log('Error', error.message)
    }

    throw error
  }
)
