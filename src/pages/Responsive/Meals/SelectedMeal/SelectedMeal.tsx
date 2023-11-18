// @ts-nocheck

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { extractMacrosFromMeal } from '@/utils/extractMacrosFromMeal'
import { Button, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material'
import { convertDateFormat } from '@/utils/convertDateFormat'
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner.index'
import { MacroSummary } from '@/components/MacroSummary/MacroSummary'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export const SelectedMeal = () => {
  const navigate = useNavigate()
  const { id: mealId } = useParams()
  const [meal, setMeal] = useState()
  // const [mealList, setMealList] = useMealListFromLocalStorage()

  const [totalMacroNutrients, setTotalMacroNutrients] = useState()

  useEffect(() => {
    const storedMeals = localStorage.getItem('meals')
    if (storedMeals) {
      const parsedMeals = JSON.parse(storedMeals)
      const selectedMeal = parsedMeals.find((meal) => meal.id === mealId)
      const total = extractMacrosFromMeal(selectedMeal)
      setTotalMacroNutrients(total)
      setMeal(selectedMeal)
    }
  }, [])

  // useEffect(() => {
  //
  //   console.log('selectedMeal', selectedMeal)
  //   console.log('mealId', mealId)
  //
  // }, [mealList])

  return (
    <main className={'flex flex-col gap-8 px-8 py-12'}>
      <Card>
        <CardContent>
          <Button className={'mb-8'} startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
            Back to Meals
          </Button>
          <Typography variant='h4'>{meal?.name}</Typography>
          <Typography color='textSecondary'>
            Created at {convertDateFormat(meal?.createdAt)}
          </Typography>
          <Divider className={'my-8'} />
          <Typography variant='h6'>Ingredients:</Typography>
          <ul>
            {meal?.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient.name}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title={'Macronutrients'} />
        <CardContent>
          {totalMacroNutrients ? <MacroSummary macros={totalMacroNutrients} /> : <LoadingSpinner />}
        </CardContent>
      </Card>
    </main>
  )
}
