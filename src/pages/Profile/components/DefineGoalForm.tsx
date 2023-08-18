import { Box, Button, InputAdornment, StepProps, TextField, Typography } from '@mui/material'
import React from 'react'

type DefineGoalFormProps = {
  handleNextStep: () => void
  handlePreviousStep: () => void
  bmrValue: number
}
export default function DefineGoalForm({
  handleNextStep,
  handlePreviousStep,
  bmrValue,
}: DefineGoalFormProps) {
  return (
    <div className={'step-container'}>
      <Typography variant={'overline'} sx={{ mb: 10 }}>
        Your daily calorie expenditure
        <Typography variant={'subtitle1'}>{Math.round(bmrValue)} kcal</Typography>
      </Typography>

      <form>
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
          <Button type={'submit'} variant={'contained'} onClick={handleNextStep}>
            FINISH
          </Button>
        </Box>
      </form>
    </div>
  )
}
