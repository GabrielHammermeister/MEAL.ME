import React from 'react'
// Components
import DefaultTemplate from '@/templates/Default/Default.index'
// Contexts
import { Typography } from '@mui/material'

import './HomePage.styles.css'
import useCurrentUser from '@/hooks/useCurrentUser'
import UserGoalChart from '@/components/UserGoalChart/UserGoalChart.index'

const HomePage = () => {
  const { currentUser } = useCurrentUser()

  return (
    <DefaultTemplate>
      <Typography variant='h4'>
        Bem vindo {currentUser?.displayName?.toLocaleUpperCase()}!
      </Typography>

      <section>
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
      </section>
    </DefaultTemplate>
  )
}

export default HomePage
