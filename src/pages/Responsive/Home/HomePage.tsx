import React, { useEffect, useState } from 'react'
// Components
// Contexts
import { Card, CardContent, CardHeader } from '@mui/material'

import './HomePage.styles.css'
import useCurrentUser from '@/hooks/useCurrentUser'
import UserGoalChart from '@/components/UserGoalChart/UserGoalChart.index'
import { MacroSummary } from '@/components/MacroSummary/MacroSummary'
import { ResponsiveLayout } from '@/templates/ResponsiveLayout/ResponsiveLayout'
import { PageTitle } from '@/components/PageTitle/PageTitle'
import DailyWeightTracker from '@/components/DailyWeightTracker/DailyWeightTracker'
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner.index'
import { generateDecimalArrayWithDates } from '@/utils/generateDecimalArrayWithDates'
import WaterTracker from '@/components/WaterTracker/WaterTracker'
import useMealListFromLocalStorage from '@/hooks/useMealListFromLocalStorage'
import { sumMacroNutrients } from '@/utils/sumMacroNutrients'
import { isEmpty } from '@/utils/isEmpty'
import EmptyState from '@/components/EmptyState/EmptyState.index'
import emptyBoxSrc from '@/assets/empty-box.svg'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/router/Router'

const MOCK_MACROS = {
  calories: 123,
  fats: {
    amount: 100,
    unit: 'g',
    percent: 30,
  },
  carbs: {
    amount: 50,
    unit: 'g',
    percent: 40,
  },
  proteins: {
    amount: 80,
    unit: 'g',
    percent: 30,
  },
}

// Example usage:
// const initialWeight = 85 // Initial weight in kg
// const goalWeight = 90 // Goal weight in kg
// const startDate = new Date('2024-02-01') // Deadline date
// const deadline = new Date('2024-03-01') // Deadline date
//
// const projectedGoalValues = generateDecimalArrayWithDates(
//   startDate,
//   deadline,
//   initialWeight,
//   goalWeight,
// )
// console.log('generateDecimalArrayWithDates', projectedGoalValues)
// const chartLabels = ['Gorduras', 'Carboidratos', 'Proteínas']
//
// const chartData = [
//   MOCK_MACROS.fats.percent,
//   MOCK_MACROS.carbs.percent,
//   MOCK_MACROS.proteins.percent,
// ]

export const HomePage = () => {
  const { currentUser } = useCurrentUser()
  const [projectedGoalValues, setProjectedGoalValues] = useState<any>()
  const [mealList, setMealList] = useMealListFromLocalStorage()
  const [totalMacroNutrients, setTotalMacroNutrients] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    // @ts-ignore
    const total = sumMacroNutrients(mealList)
    setTotalMacroNutrients(total)
    console.log('totalMacroNutrients', totalMacroNutrients)
    console.log('mealList', mealList)
  }, [mealList])

  const extractWeightValues = (
    checkpoints: { date: string; weight: number }[] | undefined,
  ): number[] => {
    if (!checkpoints) return [] // If checkpoints array is undefined or empty, return an empty array

    return checkpoints.map((checkpoint) => checkpoint.weight)
  }

  useEffect(() => {
    if (!currentUser?.goals) return
    const { initialWeight, weightGoal, deadline, initialDate } = currentUser.goals

    setProjectedGoalValues(() => {
      return generateDecimalArrayWithDates(
        new Date(initialDate),
        new Date(deadline),
        initialWeight,
        weightGoal,
      )
    })
  }, [currentUser])

  return (
    <ResponsiveLayout>
      <PageTitle text={`Welcome ${currentUser?.name}!`} />

      <section className={'flex flex-col gap-8'}>
        <div className='Summary'>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* @ts-ignore */}
            {totalMacroNutrients?.calories > 0 ? (
              <CardHeader
                title={'Daily Macro Summary'}
                subheader={'Your daily nutrient consumption'}
              />
            ) : (
              <CardHeader
                title={'No meals made'}
                subheader={'You have no eaten today. Create a new meal.'}
              />
            )}
            {/* @ts-ignore */}
            {totalMacroNutrients?.calories > 0 && (
              <>
                <CardContent>
                  <MacroSummary macros={totalMacroNutrients} />
                </CardContent>
                {/* <CardActions sx={{ p: 2, marginTop: 'auto' }}> */}
                {/*   <Button startIcon={<Add />} variant={'contained'}> */}
                {/*     Add food Consumption */}
                {/*   </Button> */}
                {/* </CardActions> */}
              </>
            )}
          </Card>
        </div>
        <div>
          <WaterTracker />
        </div>
        {isEmpty(currentUser?.goals) ? (
          <div className={'py-24 pt-12'}>
            <EmptyState
              imgSrc={emptyBoxSrc}
              imgAlt={'No goals found'}
              title={'You have no goals yet...'}
              description={'Prepare yourself for a new journey!'}
              handleOnClickButton={() => navigate(ROUTES.RESPONSIVE.CREATE_GOAL)}
              buttonLabel={'Create a goal'}
            />
          </div>
        ) : (
          <>
            <div className='chart'>
              {projectedGoalValues?.values ? (
                <UserGoalChart
                  dates={projectedGoalValues.dates}
                  chartData={[
                    {
                      name: 'Weight Goal',
                      type: 'line',
                      fill: 'solid',
                      data: projectedGoalValues.values,
                    },
                    {
                      name: 'Current Weight',
                      type: 'area',
                      fill: 'gradient',
                      data: extractWeightValues(currentUser?.goals?.checkpoint),
                    },
                  ]}
                />
              ) : (
                <LoadingSpinner />
              )}
            </div>

            <div className='checkout'>
              <DailyWeightTracker />
            </div>
          </>
        )}
      </section>
    </ResponsiveLayout>
  )
}
