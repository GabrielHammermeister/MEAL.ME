import axios from "axios";

export function SpoonacularInterceptor() {
  axios.interceptors.request.use((request) => {
    request.params = { apiKey: import.meta.env.REACT_APP_SPOONACULAR2_API_KEY };

    return request;
  });
}
