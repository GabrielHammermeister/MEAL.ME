/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, LinearProgress, LinearProgressProps, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import './styles.css'
export interface MacroNutrientProps {
  name: string
  macroNutrient: {
    amount: number
    unit: string
  }
  percent: number
}

export const LinearProgressWithLabel = (props: LinearProgressProps & { value: number }) => {
  const [progress, setProgress] = React.useState(0)

  // @ts-ignore
  const calculateProgress = (timer: NodeJS.Timer) => {
    setProgress((oldProgress) => {
      if (oldProgress === props.value) {
        clearInterval(timer)
      }
      const progressRate = 7

      return Math.min(oldProgress + progressRate, props.value)
    })
  }

  useEffect(() => {
    const timer = setInterval(calculateProgress, 150)
    return () => {
      clearInterval(timer)
    }
  }, [props.value])

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant='determinate' {...props} value={progress} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant='body2' color='text.secondary'>{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  )
}
function MacroProgressBar({ name, macroNutrient, percent }: MacroNutrientProps) {
  console.log('Name: ', name, percent)
  return (
    <div>
      <Typography variant='caption'>
        {name}:{' '}
        {macroNutrient.amount < 0.1 ? ' - ' : `${macroNutrient.amount} ${macroNutrient.unit}`}
      </Typography>
      <LinearProgressWithLabel value={percent} />
    </div>
  )
}

export default MacroProgressBar
