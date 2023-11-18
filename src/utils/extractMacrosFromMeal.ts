export type MacroNutrient = {
  amount: number
  unit: string
  percent: number
}

interface MealItem {
  id: string
  name: string
  counter: number
  calories: number
  macroNutrients: {
    carbohydrate: MacroNutrient
    fat: MacroNutrient
    protein: MacroNutrient
  }
  type: string
  checkpoints: []
  // ...other properties
}

export const extractMacrosFromMeal = (meal: MealItem): any => {
  const totalNutrients = {
    calories: 0,
    fats: { amount: 0, unit: 'g', percent: 0 },
    carbs: { amount: 0, unit: 'g', percent: 0 },
    proteins: { amount: 0, unit: 'g', percent: 0 },
  }
  const { calories, macroNutrients } = meal
  totalNutrients.calories += calories

  totalNutrients.proteins.amount = macroNutrients.protein.amount
  totalNutrients.fats.amount = macroNutrients.fat.amount
  totalNutrients.carbs.amount = macroNutrients.carbohydrate.amount

  const newProteinPercent = ((totalNutrients.proteins.amount * 4) / totalNutrients.calories) * 100
  const newFatPercent = ((totalNutrients.fats.amount * 9) / totalNutrients.calories) * 100
  const newCarbsPercent = ((totalNutrients.carbs.amount * 4) / totalNutrients.calories) * 100

  totalNutrients.proteins.percent = newProteinPercent
  totalNutrients.fats.percent = newFatPercent
  totalNutrients.carbs.percent = newCarbsPercent

  return totalNutrients
}
