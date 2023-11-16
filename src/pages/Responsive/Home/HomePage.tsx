import React from 'react'
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

function calculateProjectedWeights(
  initialWeight: number,
  basalMetabolicRate: number,
  goalWeight: number,
  recommendedDailyCalories: number,
  deadline: Date,
): number[] {
  const weights: number[] = []
  const dates: string[] = []

  const millisecondsInDay = 24 * 60 * 60 * 1000 // Milliseconds in a day

  let currentDate = new Date()
  let currentWeight = initialWeight

  const caloricDiff = recommendedDailyCalories - basalMetabolicRate

  weights.push(currentWeight)
  dates.push(
    currentDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
  )

  while (currentDate < deadline) {
    const dailyWeightChange = caloricDiff / 7700
    currentWeight += dailyWeightChange

    weights.push(currentWeight.toFixed(2))

    currentDate = new Date(currentDate.getTime() + millisecondsInDay)
    dates.push(
      currentDate.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      }),
    )
  }

  // while (currentDate < deadline) {
  //   // Calculate the change in weight based on calorie intake and metabolism
  //   const daysDifference = (deadline.getTime() - currentDate.getTime()) / millisecondsInDay
  //   const calorieDifference = daysDifference * recommendedDailyCalories
  //   const weightDifference = calorieDifference / 7700 // Assuming 7700 calories per kg change
  //
  //   // Adjust weight based on metabolic rate
  //   const metabolicRateWeightChange = (basalMetabolicRate / 7700) * (daysDifference / 30) // Assuming 30 days in a month
  //
  //   currentWeight += weightDifference - metabolicRateWeightChange
  //   weights.push(parseFloat(currentWeight.toFixed(2))) // Round to 2 decimal places
  //
  //   currentDate = new Date(currentDate.getTime() + millisecondsInDay)
  // }

  return { weights }
}

// Example usage:
const initialWeight = 85 // Initial weight in kg
const basalMetabolicRate = 1966 // Basal Metabolic Rate in calories
const goalWeight = 95 // Goal weight in kg
const recommendedDailyCalories = 2394 // Recommended daily calories
const deadline = new Date('2024-05-01') // Deadline date

const projectedWeights = calculateProjectedWeights(
  initialWeight,
  basalMetabolicRate,
  goalWeight,
  recommendedDailyCalories,
  deadline,
)
console.log('Projected Weights:', projectedWeights)

export const HomePage = () => {
  const { currentUser } = useCurrentUser()

  return (
    <ResponsiveLayout>
      <PageTitle text={`Bem vindo ${currentUser?.displayName?.toLocaleUpperCase()}!`} />

      <section className={'flex flex-col gap-8'}>
        <div className='Summary'>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardHeader
              title={'Daily Macro Summary'}
              subheader={'Your daily nutrient consumption'}
            />
            <CardContent>
              <MacroSummary macros={MOCK_MACROS} />
            </CardContent>
            <CardActions sx={{ p: 2, marginTop: 'auto' }}>
              <Button startIcon={<Add />} variant={'contained'}>
                Add food Consumption
              </Button>
            </CardActions>
          </Card>
        </div>

        <div className='chart'>
          <UserGoalChart
            chartData={[
              {
                name: 'Weight Goal',
                type: 'line',
                fill: 'solid',
                // data: [110, 109, 107, 105, 103, 100, 99, 98, 97, 95],
                data: projectedWeights,
              },
              {
                name: 'Current Weight',
                type: 'area',
                fill: 'gradient',
                data: [115, 114],
              },
            ]}
          />
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
