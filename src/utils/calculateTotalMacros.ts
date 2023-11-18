type MacroNutrient = {
  amount: number
  unit: string
  percent: number
}

interface MacroSummary {
  macros: {
    calories?: number
    fats: MacroNutrient
    carbs: MacroNutrient
    proteins: MacroNutrient
  }
}

type Nutrient = {
  name?: string
  amount?: number
  unit?: string
  percentOfDailyNeeds?: number
}

interface Nutrition {
  nutrients: Nutrient[]
  caloricBreakdown: CaloricBreakdown
}

interface CaloricBreakdown {
  percentProtein: number
  percentFat: number
  percentCarbs: number
}

export function calculateTotalMacros(
  nutrition: Nutrition,
  prevMacros?: MacroSummary,
): MacroSummary {
  let Calories = nutrition.nutrients.find((el) => el.name === 'Calories')
  const { caloricBreakdown } = nutrition

  const Protein = nutrition.nutrients.find((el) => el.name === 'Protein')
  const Carbohydrates = nutrition.nutrients.find((el) => el.name === 'Carbohydrates')
  const Fat = nutrition.nutrients.find((el) => el.name === 'Fat')
  if (prevMacros) {
    console.log()
    const {
      macros: { calories, fats, proteins, carbs },
    } = prevMacros
    const sumProtein = proteins.amount + Protein?.amount
    const sumFat = fats.amount + Fat?.amount
    const sumCarbs = carbs.amount + Carbohydrates?.amount
    const prevCalories = calories

    console.log('Before', Calories)
    const newTotalCalories = Calories?.amount + prevCalories
    const newProteinPercent = ((sumProtein * 4) / newTotalCalories) * 100
    const newFatPercent = ((sumFat * 9) / newTotalCalories) * 100
    const newCarbsPercent = ((sumCarbs * 4) / newTotalCalories) * 100
    // @ts-ignore
    console.log('After', Calories)

    return {
      macros: {
        calories: newTotalCalories,
        proteins: { amount: sumProtein, unit: 'g', percent: newProteinPercent },
        fats: { amount: sumFat, unit: 'g', percent: newFatPercent },
        carbs: { amount: sumCarbs, unit: 'g', percent: newCarbsPercent },
      },
    }
  }

  return {
    macros: {
      calories: Calories.amount,
      proteins: { amount: Protein?.amount, unit: 'g', percent: caloricBreakdown.percentProtein },
      fats: { amount: Fat?.amount, unit: 'g', percent: caloricBreakdown.percentFat },
      carbs: { amount: Carbohydrates?.amount, unit: 'g', percent: caloricBreakdown.percentCarbs },
    },
  }
}
