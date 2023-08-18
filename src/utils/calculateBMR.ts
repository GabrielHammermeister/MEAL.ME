export default function calculateBMR(
  weight: number,
  height: number,
  age: number,
  isMale: boolean,
): number {
  const bmrConstant = isMale ? 88.362 : 447.593
  const weightConstant = isMale ? 13.397 : 9.247
  const heightConstant = isMale ? 4.799 : 3.098
  const ageConstant = isMale ? 5.677 : 4.33

  return bmrConstant + weightConstant * weight + heightConstant * height - ageConstant * age
}
