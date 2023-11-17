import { Box } from '@mui/system'
import MacroProgressBar from '@/components/MacroProgressBar'
import { CircularProgress, Typography } from '@mui/material'
import React from 'react'

export type MacroNutrient = {
  amount: number
  unit: string
  percent: number
}

interface MacroSummaryProps {
  macros: {
    calories: number
    fats: MacroNutrient
    carbs: MacroNutrient
    proteins: MacroNutrient
  }
  loading?: boolean
}

export function MacroSummary({
  macros: { calories, fats, proteins, carbs },
  loading = false,
}: MacroSummaryProps) {
  if (loading) {
    return <CircularProgress />
  }
  console.log('macros', { calories, fats, proteins, carbs })
  return (
    <>
      <Box>
        <MacroProgressBar
          name={'Proteins'}
          macroNutrient={{ amount: proteins.amount, unit: proteins.unit }}
          percent={Math.floor(proteins.percent)}
        />
        <MacroProgressBar
          name={'Carbohydrates'}
          macroNutrient={{ amount: carbs.amount, unit: carbs.unit }}
          percent={Math.floor(carbs.percent)}
        />
        <MacroProgressBar
          name={'Fats'}
          macroNutrient={{ amount: fats.amount, unit: fats.unit }}
          percent={Math.floor(fats.percent)}
        />
      </Box>
      <Typography variant='overline' mb={2}>
        Total calories: {calories} kcal
      </Typography>
    </>
  )
}
