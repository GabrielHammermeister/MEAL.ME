import { Action, MealStateType } from '@/pages/CreateMeal/types'
import { IngredientType } from '@/models/Ingredient'

function updateMacros(ingredients: Array<IngredientType>) {
  const initialMacros = {
    calories: 0,
    fats: {
      amount: 0,
      unit: 'g',
      percent: 0,
    },
    carbs: {
      amount: 0,
      unit: 'g',
      percent: 0,
    },
    proteins: {
      amount: 0,
      unit: 'g',
      percent: 0,
    },
  }
  return ingredients.reduce((acc, currentValue) => {
    acc.calories += currentValue.macros.calories
    acc.fats.amount += Math.floor(currentValue.macros.fats.amount)
    acc.fats.percent = ((acc.fats.amount * 9) / acc.calories) * 100
    acc.carbs.amount += Math.floor(currentValue.macros.carbs.amount)
    acc.carbs.percent = ((acc.carbs.amount * 4) / acc.calories) * 100
    acc.proteins.amount += Math.floor(currentValue.macros.proteins.amount)
    acc.proteins.percent = ((acc.proteins.amount * 4) / acc.calories) * 100

    return acc
  }, initialMacros)
}

export function mealReducer(state: MealStateType, action: Action) {
  switch (action.type) {
    case 'add-ingredient': {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload.ingredient],
      }
    }
    case 'update-macros': {
      const newMacroNutrients = updateMacros(state.ingredients)
      return {
        ...state,
        macroNutrients: newMacroNutrients,
      }
    }
    default: {
      return state
    }
  }
}
