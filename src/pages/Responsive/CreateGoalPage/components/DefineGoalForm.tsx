// @ts-nocheck
import { Box, Button, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import '../styles.css'
import { useNavigate } from 'react-router-dom'
import useCurrentUser from '@/hooks/useCurrentUser'

type DefineGoalFormProps = {
  handlePreviousStep: () => void
  handleNextStep: () => void

  bmrValue: number
  setGoal: (areg: any) => void
  createdGoal: any
}

export default function DefineGoalForm({
  handlePreviousStep,
  handleNextStep,
  bmrValue,
  setGoal,
  createdGoal,
}: DefineGoalFormProps) {
  const navigate = useNavigate()
  const { currentUser } = useCurrentUser()
  const [deadline, setDeadline] = useState<number>()
  const [weightGoal, setWeightGoal] = useState<number | ''>('')
  const handleDeadlineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeadline(event.target.valueAsNumber)
  }

  const handleWeightGoalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeightGoal(event.target.valueAsNumber || '')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setGoal((prev: any) => ({
      ...prev,
      deadline: deadline,
      initialDate: new Date().toISOString(),
      weightGoal: weightGoal,
    }))
    handleNextStep()
  }

  return (
    <div className={'step-container'}>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className={'flex flex-col items-center'}>
          <TextField
            label='Deadline'
            type='number'
            value={deadline}
            onChange={handleDeadlineChange}
            sx={{ m: 1, width: '25ch' }}
            InputProps={{
              endAdornment: <InputAdornment position='start'>months</InputAdornment>,
            }}
            helperText='Set a deadline for your goal'
          />
          <TextField
            label='Weight Goal'
            type='number'
            value={weightGoal}
            onChange={handleWeightGoalChange}
            sx={{ m: 1, width: '25ch' }}
            InputProps={{
              endAdornment: <InputAdornment position='start'>kg</InputAdornment>,
            }}
            helperText='Set a weight goal'
          />
        </div>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 10 }}>
          <Button variant={'outlined'} onClick={handlePreviousStep}>
            Previous Step
          </Button>
          <Button type={'submit'} variant={'contained'}>
            Next Step
          </Button>
        </Box>
      </form>
    </div>
  )
}
