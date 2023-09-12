import { MacroNutrient } from '@/components/MacroSummary/MacroSummary'
import { IngredientType } from '@/models/Ingredient'

export type Action =
  | { type: 'add-ingredient'; payload: { ingredient: IngredientType } }
  | { type: 'change-name'; payload: { name: string } }
  | { type: 'update-macros' }

export type MealStateType = {
  name: string
  macroNutrients: {
    calories: number
    fats: MacroNutrient
    carbs: MacroNutrient
    proteins: MacroNutrient
  }
  ingredients: Array<IngredientType>
}
