import axios from "axios";

const BASE_URL = "https://api.spoonacular.com/food/ingredients";
const AUTH = `&apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`;
export function getIngredients(ingredient) {
  return axios.get(
    BASE_URL +
      `/search?query=${ingredient}&number=4&sort=calories&sortDirection=desc` +
      AUTH
  );
}

export function getInformationById(id) {
  return axios.get(
    BASE_URL + `/${id}/information?amount=100&unit=grams` + AUTH
  );
}
