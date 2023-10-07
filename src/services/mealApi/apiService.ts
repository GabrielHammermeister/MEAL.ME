import axios, { AxiosInstance } from 'axios'

const baseURL = import.meta.env.VITE_MEAL_API_BASE_URL

const mealApiService: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
})

export default mealApiService
