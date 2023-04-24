const BASE_URL = 'https://spoonacular.com/cdn/ingredients_250x250'
export function getIngredientImage(imageFile: string) {
  return `${BASE_URL}/${imageFile}`
}
