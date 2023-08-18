export default function calculateCalorieDifference(
  bmr: number,
  currentWeight: number,
  goalWeight: number,
  deadlineInMonths: number,
): number {
  const weightDifference = currentWeight - goalWeight
  const daysInMonth = 30
  const daysRemaining = daysInMonth * deadlineInMonths
  const calorieDifference = (weightDifference * 7700) / daysRemaining

  return calorieDifference
}
