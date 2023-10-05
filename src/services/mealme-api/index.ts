import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const baseURL = import.meta.env.VITE_MEAL_API_BASE_URL

const axiosInstance = axios.create({ baseURL })
// axiosInstance.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://127.0.0.1:5173'

export default axiosInstance
