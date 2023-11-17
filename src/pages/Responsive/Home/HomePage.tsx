import React, { useEffect, useState } from 'react'
// Components
// Contexts
import { Button, Card, CardActions, CardContent, CardHeader } from '@mui/material'

import './HomePage.styles.css'
import useCurrentUser from '@/hooks/useCurrentUser'
import UserGoalChart from '@/components/UserGoalChart/UserGoalChart.index'
import { MacroSummary } from '@/components/MacroSummary/MacroSummary'
import { Add } from '@mui/icons-material'
import { ResponsiveLayout } from '@/templates/ResponsiveLayout/ResponsiveLayout'
import { PageTitle } from '@/components/PageTitle/PageTitle'
import DailyWeightTracker from '@/components/DailyWeightTracker/DailyWeightTracker'
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner.index'
import { generateDecimalArrayWithDates } from '@/utils/generateDecimalArrayWithDates'

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

  const extractWeightValues = (
    checkpoints: { date: string; weight: number }[] | undefined,
  ): number[] => {
    if (!checkpoints) return [] // If checkpoints array is undefined or empty, return an empty array

    return checkpoints.map((checkpoint) => checkpoint.weight)
  }

  useEffect(() => {
    if (!currentUser?.goals) return
    console.log('NOW USER', currentUser)
    const { initialWeight, weightGoal, deadline, initialDate } = currentUser.goals

    console.log('NOW GOAL', { initialWeight, weightGoal, deadline, initialDate })
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
            {currentUser?.meals?.length > 0 ? (
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
            {currentUser?.meals?.length > 0 && (
              <>
                <CardContent>
                  <MacroSummary macros={MOCK_MACROS} />
                </CardContent>
                <CardActions sx={{ p: 2, marginTop: 'auto' }}>
                  <Button startIcon={<Add />} variant={'contained'}>
                    Add food Consumption
                  </Button>
                </CardActions>
              </>
            )}
          </Card>
        </div>

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
          {/* <Card sx={{ height: '100%' }}>*/}
          {/*  <CardHeader title={'Daily Weight Check'} subheader={'Check your body weight daily'} />*/}
          {/*  /!* <CardContent> *!/*/}
          {/*  /!*    *!/*/}
          {/*  /!* </CardContent> *!/*/}
          {/*  <CardActions sx={{ p: 3, display: 'flex', justifyContent: 'space-between' }}>*/}
          {/*    <TextField*/}
          {/*      variant={'outlined'}*/}
          {/*      type={'number'}*/}
          {/*      InputProps={{*/}
          {/*        endAdornment: <InputAdornment position='start'>kg</InputAdornment>,*/}
          {/*      }}*/}
          {/*    />*/}
          {/*    <Button size='large' variant={'outlined'}>*/}
          {/*      save*/}
          {/*    </Button>*/}
          {/*  </CardActions>*/}
          {/* </Card>*/}
          <DailyWeightTracker />
        </div>
      </section>
    </ResponsiveLayout>
  )
}
