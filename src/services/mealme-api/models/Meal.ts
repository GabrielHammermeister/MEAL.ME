export interface Meal {
  calories: number
  checkpoints: {
    [key: string]: { timestamp: string }
  }
  ingredients: {
    [key: string]: {
      amount: number
      id: string
      name: string
      unit: string
    }
  }
  macroNutrients: {
    carbohydrate: number
    fat: number
    protein: number
  }
  name: string
}
