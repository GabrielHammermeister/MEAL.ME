export interface Meal {
  calories: number
  checkpoints: Record<string, Checkpoint>
  ingredients: Record<string, Ingredient>
  macroNutrients: MacroNutrients
  name: string
}

type Checkpoint = {
  timestamp: string
}

type Ingredient = {
  amount: number
  id: string
  name: string
  unit: string
}

type MacroNutrients = {
  carbohydrate: number
  fat: number
  protein: number
}
