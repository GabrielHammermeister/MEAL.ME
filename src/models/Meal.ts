interface MealCheckpoint {
  timestamp: string
}

interface Ingredient {
  amount: number
  unit: string
  name: string
  id: string
}

interface MacroNutrients {
  protein: number
  fat: number
  carbohydrate: number
}

export interface Meal {
  name: string
  type?: 'solid' | 'liquid'
  checkpoints: Record<string, MealCheckpoint>
  ingredients: Record<string, Ingredient>
  calories: number
  macroNutrients: MacroNutrients
}
