import React, { useState } from 'react'
// Components
import DefaultTemplate from '@/templates/Default/Default.index'
// Contexts
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'

import './HomePage.styles.css'
import useCurrentUser from '@/hooks/useCurrentUser'
import UserGoalChart from '@/components/UserGoalChart/UserGoalChart.index'
import { MacroSummary } from '@/components/MacroSummary/MacroSummary'
import { Add } from '@mui/icons-material'
import firebase from 'firebase/compat'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import EditIcon from '@mui/icons-material/Edit'
import WaterTracker from '@/components/WaterTracker/WaterTracker'
import firestore = firebase.firestore

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
  const [checkedOut, setCheckedOut] = useState(() => hasCheckedOut())

  function hasCheckedOut() {
    const currentDate = firestore.Timestamp.now().toDate()
    const yesterday = firestore.Timestamp.now().toDate()
    yesterday.setDate(currentDate.getMonth() - 1)
    return !(currentDate > yesterday)
  }

  function handleDailyCheckout() {
    setCheckedOut((prevState) => !prevState)
  }
  function handleEditWeight() {
    setCheckedOut((prevState) => !prevState)
  }

  return (
    <DefaultTemplate>
      <Typography variant='h4'>
        Bem vindo {currentUser?.displayName?.toLocaleUpperCase()}!
        {/* <h1 className='text-3xl font-bold underline'>checkedOut: {String(checkedOut)}</h1> */}
      </Typography>

      <section className={'dashboard-home grid grid-cols-10 gap-y-4'}>
        <div className='Summary col-span-10 md:col-span-7'>
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
        <div className='col-span-10 md:col-span-7'>
          <WaterTracker />
        </div>
        <div className='chart col-span-10 md:col-span-7'>
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
        {/* <div className={' bg-violet-950 min-h-[300px] row-span-2 col-span-10 md:col-span-7'}></div> */}
        {/* <div className={' bg-violet-950 min-h-[200px] row-span-1 col-span-10 md:col-span-7'}></div> */}
        {/* <div className={' bg-violet-950 min-h-[200px] row-span-1 col-span-10 md:col-span-7'}></div> */}
        <div className='checkout col-span-10 md:col-span-7'>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title={'Daily Weight Check'}
              subheader={'Check your body weight daily'}
              action={
                checkedOut ? (
                  <IconButton onClick={handleEditWeight}>
                    <EditIcon />
                  </IconButton>
                ) : null
              }
            />

            <CardActions
              sx={{ p: 3, display: 'flex' }}
              className={checkedOut ? 'gap-3 justify-start' : 'justify-between'}
            >
              {checkedOut ? (
                <>
                  <CheckCircleIcon color={'primary'} fontSize={'large'} />
                  <div>
                    <Typography variant={'body1'}>Body weight saved with success</Typography>
                    <Typography variant={'caption'}>You can check your weight tomorrow</Typography>
                  </div>
                </>
              ) : (
                <>
                  <TextField
                    variant={'outlined'}
                    type={'number'}
                    InputProps={{
                      endAdornment: <InputAdornment position='start'>kg</InputAdornment>,
                    }}
                  />
                  <Button size='large' variant={'outlined'} onClick={handleDailyCheckout}>
                    save
                  </Button>
                </>
              )}
            </CardActions>
          </Card>
        </div>
      </section>
    </DefaultTemplate>
  )
}

export default HomePage
