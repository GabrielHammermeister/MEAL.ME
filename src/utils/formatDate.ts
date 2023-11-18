export function formatDate(dateString: string): string {
  console.log('dateString', dateString)
  const date = new Date(dateString)
  console.log(date)
  const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date
    .getDate()
    .toString()
    .padStart(2, '0')}/${date.getFullYear()}`
  return formattedDate
}
