import React from 'react'
// Components
import DefaultTemplate from '@/templates/Default/Default.index'
// Contexts
import { Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material'

import './HomePage.styles.css'
import useCurrentUser from '@/hooks/useCurrentUser'
import UserGoalChart from '@/components/UserGoalChart/UserGoalChart.index'
import { MacroSummary } from '@/components/MacroSummary/MacroSummary'
import { Add } from '@mui/icons-material'

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

const HomePage = () => {
  const { currentUser } = useCurrentUser()

  return (
    <DefaultTemplate>
      <Typography variant='h4'>
        Bem vindo {currentUser?.displayName?.toLocaleUpperCase()}!
      </Typography>

      <section className={'dashboard-home'}>
        <div className='chart'>
          <UserGoalChart
            chartData={[
              {
                name: 'Weight Goal',
                type: 'line',
                fill: 'solid',
                data: [110, 109, 107, 105, 103, 100, 99, 98, 97, 95],
              },
              {
                name: 'Current Weight',
                type: 'area',
                fill: 'gradient',
                data: [115, 111, 105, 104, 103, 102, 101, 100],
              },
            ]}
          />
        </div>
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
        <div className='checkout'>
          <Card sx={{ height: '100%' }}>
            <CardHeader title={'Daily Weight Check'} subheader={'Check your body weight daily'} />

            <CardActions>
              <Button size='small'>Learn More</Button>
            </CardActions>
          </Card>
        </div>
      </section>
    </DefaultTemplate>
  )
}

export default HomePage
