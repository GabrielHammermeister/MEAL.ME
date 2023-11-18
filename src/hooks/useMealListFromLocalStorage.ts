import { useEffect, useState } from 'react'

const useMealListFromLocalStorage = () => {
  const [mealList, setMealList] = useState([])

  useEffect(() => {
    const storedMeals = localStorage.getItem('meals')
    if (storedMeals) {
      const parsedMeals = JSON.parse(storedMeals)
      setMealList(parsedMeals)
    }
  }, [])

  return [mealList, setMealList]
}

export default useMealListFromLocalStorage
