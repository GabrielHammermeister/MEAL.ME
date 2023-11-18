// @ts-nocheck
import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material'
import React from 'react'
import { createGoal } from '@/services/mealApi/goalsService'
import { Goal } from '@/models'
import useCurrentUser from '@/hooks/useCurrentUser'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/router/Router'
import '../styles.css'

type DefineGoalFormProps = {
  handleNextStep: () => void
  handlePreviousStep: () => void
  bmrValue: number
}

const dataObject = {
  type: 'WEIGHT_GAIN',
  dailyCalories: 2500,
  deadline: '2025-12-31',
  weight: 70,
  checkpoint: [
    {
      date: '2023-06-30',
      weight: 72,
    },
    {
      date: '2023-09-30',
      weight: 75,
    },
  ],
}

export default function DefineGoalForm({
  handleNextStep,
  handlePreviousStep,
  bmrValue,
}: DefineGoalFormProps) {
  const { currentUser } = useCurrentUser()
  const navigate = useNavigate()

  async function handleCreateGoal() {
    await createGoal(dataObject as Goal, currentUser?.uid)
    console.log('rota: ', ROUTES.RESPONSIVE.PROFILE)
    return navigate(ROUTES.RESPONSIVE.PROFILE)
  }

  return (
    <div className={'step-container'}>
      <Typography variant={'overline'} sx={{ mb: 10 }}>
        Your daily calorie expenditure
        <Typography variant={'subtitle1'}>{Math.round(bmrValue)} kcal</Typography>
      </Typography>

      <form onSubmit={(event) => event.preventDefault()}>
        <div>
          <TextField
            label='Deadline'
            type={'number'}
            sx={{ m: 1, width: '25ch' }}
            InputProps={{
              endAdornment: <InputAdornment position='start'>months</InputAdornment>,
            }}
            helperText={'Set a deadline for your goal'}
          />
          <TextField
            label='Weight Goal'
            type={'number'}
            sx={{ m: 1, width: '25ch' }}
            InputProps={{
              endAdornment: <InputAdornment position='start'>kg</InputAdornment>,
            }}
            helperText={'Set a weight goal'}
          />
        </div>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 10 }}>
          <Button variant={'outlined'} onClick={handlePreviousStep}>
            Previous Step
          </Button>
          <Button type={'submit'} variant={'contained'} onClick={handleCreateGoal}>
            FINISH
          </Button>
        </Box>
      </form>
    </div>
  )
}
