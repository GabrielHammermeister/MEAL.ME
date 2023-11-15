import { Box, Button, InputAdornment, StepProps, TextField, Typography } from '@mui/material'
import React from 'react'

import { ResponsiveLayout } from '@/templates/ResponsiveLayout/ResponsiveLayout'

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
  // Primeira tela
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: '16px',
        }}
      >
        <Typography variant={'overline'}>
          Your daily calorie expenditure
          <Typography variant={'subtitle1'}>{Math.round(bmrValue)} kcal</Typography>
        </Typography>

        <form>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
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
          </Box>
        </form>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end', // Alinha os botões à direita
          gap: '16px', // Espaçamento entre os botões
          mt: 10, // Margem superior
        }}
      >
        <Button variant={'outlined'} onClick={handlePreviousStep}>
          Previous Step
        </Button>
        <Button type={'submit'} variant={'contained'} onClick={handleNextStep}>
          FINISH
        </Button>
      </Box>
    </>
  )
}
