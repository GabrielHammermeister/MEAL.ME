import { Ingredient } from '@/context/Ingredient.provider'
import { MacroNutrient } from '@/components/MacroSummary/MacroSummary'

export interface IngredientType extends Ingredient {
  macros: {
    calories: number
    fats: MacroNutrient
    carbs: MacroNutrient
    proteins: MacroNutrient
  }
}
