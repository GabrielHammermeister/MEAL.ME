import axios, { AxiosInstance } from 'axios'

const baseURL = 'http://44.196.49.137'

const mealApiService: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
})

export default mealApiService
