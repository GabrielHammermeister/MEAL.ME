import { Typography, Button, Stepper, Step, StepLabel, Paper, Box } from '@mui/material'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import { styled } from '@mui/material/styles'

type GoalTypeFormProps = {
  handleNextStep: () => void
}

export default function GoalTypeForm({ handleNextStep }: GoalTypeFormProps) {
  const steps = ['a', 'b', 'c']

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        mt: '128px',
      }}
    >
      <Button
        size={'large'}
        variant={'outlined'}
        onClick={handleNextStep}
      >
        Gain Weight
      </Button>
      <Button
        size={'large'}
        variant={'outlined'}
        onClick={handleNextStep}
      >
        Lose Weight
      </Button>
    </Box>
  )
}
