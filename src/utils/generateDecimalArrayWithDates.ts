export function generateDecimalArrayWithDates(
  startDate: Date,
  endDate: Date,
  startValue: number,
  endValue: number,
): {
  values: number[]
  dates: string[]
} {
  const millisecondsPerDay = 24 * 60 * 60 * 1000 // Number of milliseconds in a day
  const daysDifference = Math.round((endDate.getTime() - startDate.getTime()) / millisecondsPerDay)

  const step = (endValue - startValue) / daysDifference

  // console.log('endDate', endDate)
  // console.log('startDate', startDate)
  // console.log('daysDifference', daysDifference)
  const resultValues: number[] = []
  const resultDates: string[] = []
  let currentValue = startValue

  for (let i = 0; i <= daysDifference; i++) {
    resultValues.push(parseFloat(currentValue.toFixed(2)))

    const currentDate = new Date(startDate.getTime() + i * millisecondsPerDay)
    const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}/${currentDate.getFullYear()}`
    resultDates.push(formattedDate)

    currentValue += step
  }
  // console.log('generateDecimalArray: ', { values: resultValues, dates: resultDates })

  return { values: resultValues, dates: resultDates }
}
