import axios from 'axios'
import { setupCache } from 'axios-cache-interceptor'

const BASE_URL = 'https://api.spoonacular.com/food/ingredients'

const spoonacularApi = axios.create({
  baseURL: BASE_URL,
  params: { apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY },
})

export const axiosAPI = setupCache(spoonacularApi, { cacheTakeover: false })
