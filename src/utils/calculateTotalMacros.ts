type MacroNutrient = {
  amount: number
  unit: string
  percent: number
}

interface MacroSummary {
  macros: {
    calories: number
    fats: MacroNutrient
    carbs: MacroNutrient
    proteins: MacroNutrient
  }
}

type Nutrient = {
  name: string
  amount: number
  unit: string
  percentOfDailyNeeds: number
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

export function calculateTotalMacros(nutrition: Nutrition): MacroSummary {
  const calories = nutrition.nutrients.find((el) => el.name === 'Calories')
  const { caloricBreakdown } = nutrition
  if (!calories) throw Error('Erro de servico')
  else {
    const proteins = (calories.amount * (caloricBreakdown.percentProtein / 100)) / 4
    const carbs = (calories.amount * (caloricBreakdown.percentCarbs / 100)) / 4
    const fats = (calories.amount * (caloricBreakdown.percentFat / 100)) / 9
    return {
      macros: {
        calories: calories.amount,
        proteins: { amount: proteins, unit: 'g', percent: caloricBreakdown.percentProtein },
        fats: { amount: fats, unit: 'g', percent: caloricBreakdown.percentFat },
        carbs: { amount: carbs, unit: 'g', percent: caloricBreakdown.percentCarbs },
      },
    }
  }
}
