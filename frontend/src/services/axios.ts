import axios, { AxiosRequestConfig } from 'axios'

const config: AxiosRequestConfig = { baseURL: 'http://localhost:4000' }
export const axiosInstance = axios.create(config)
