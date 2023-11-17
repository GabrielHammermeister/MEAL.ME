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
  const { calories, fats, proteins, carbs } = prevMacros
  if (prevMacros) {
    const proteins = prevMacros.macros.proteins.amount * 4
    const carbs = (calories.amount * (caloricBreakdown.percentCarbs / 100)) / 4
    const fats = (calories.amount * (caloricBreakdown.percentFat / 100)) / 9
  }

  const newCalories = nutrition.nutrients.find((el) => el.name === 'Calories')
  const Protein = nutrition.nutrients.find((el) => el.name === 'Protein')
  const Carbohydrates = nutrition.nutrients.find((el) => el.name === 'Carbohydrates')
  const Fat = nutrition.nutrients.find((el) => el.name === 'Fat')

  const { caloricBreakdown } = nutrition
  if (!calories) throw Error('Erro de servico')
  else {
    //
    return {
      macros: {
        calories: newCalories.amount,
        proteins: { amount: Protein?.amount, unit: 'g', percent: caloricBreakdown.percentProtein },
        fats: { amount: Fat?.amount, unit: 'g', percent: caloricBreakdown.percentFat },
        carbs: { amount: Carbohydrates?.amount, unit: 'g', percent: caloricBreakdown.percentCarbs },
      },
    }
  }
}
