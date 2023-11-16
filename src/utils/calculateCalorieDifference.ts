export function calculateCalorieDifference(
  bmr: number,
  deadlineMonths: number,
  weightGoal: number,
  currentWeight: number,
): number {
  const weightDifference: number = weightGoal - currentWeight

  const totalCaloriesChange: number = weightDifference * 7700

  const caloriesPerMonth: number = totalCaloriesChange / deadlineMonths

  const dailyCaloriesRecommended: number = bmr + caloriesPerMonth / 30 // Assuming 30 days in a month

  const logData = {
    BMR: bmr,
    'Deadline Months': deadlineMonths,
    'Weight Goal': weightGoal,
    'Current Weight': currentWeight,
    'Weight Difference': weightDifference,
    'Total Calories Change': totalCaloriesChange,
    'Calories Per Month': caloriesPerMonth,
    'Calories Recommended': dailyCaloriesRecommended,
  }

  console.table(logData)

  return Math.round(dailyCaloriesRecommended)
}
