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

export const sumMacroNutrients = (meals: MealItem[]): any => {
  const totalNutrients = {
    calories: 0,
    fats: { amount: 0, unit: 'g', percent: 0 },
    carbs: { amount: 0, unit: 'g', percent: 0 },
    proteins: { amount: 0, unit: 'g', percent: 0 },
  }

  meals.forEach((meal) => {
    const { counter, calories, macroNutrients } = meal
    console.log('meal', meal)
    totalNutrients.calories += counter * calories

    totalNutrients.proteins.amount += counter * macroNutrients.protein.amount
    totalNutrients.fats.amount += counter * macroNutrients.fat.amount
    totalNutrients.carbs.amount += counter * macroNutrients.carbohydrate.amount

    const newProteinPercent = ((totalNutrients.proteins.amount * 4) / totalNutrients.calories) * 100
    const newFatPercent = ((totalNutrients.fats.amount * 9) / totalNutrients.calories) * 100
    const newCarbsPercent = ((totalNutrients.carbs.amount * 4) / totalNutrients.calories) * 100

    totalNutrients.proteins.percent = newProteinPercent
    totalNutrients.fats.percent = newFatPercent
    totalNutrients.carbs.percent = newCarbsPercent
  })
  console.log('totalNutrients', totalNutrients)

  return totalNutrients
}
