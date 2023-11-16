import { Button, Typography } from '@mui/material'
import '../styles.css'

type GoalTypeFormProps = {
  handleNextStep: () => void
  setGoal: (areg: any) => void
}

export default function GoalTypeForm({ handleNextStep, setGoal }: GoalTypeFormProps) {
  const clickGainWeight = () => {
    setGoal({ type: 'WEIGHT_GAIN' })
    handleNextStep()
  }
  const clickLooseWeight = () => {
    setGoal({ type: 'WEIGHT_LOSS' })
    handleNextStep()
  }

  return (
    <div className={'step-container'}>
      <Typography></Typography>
      <Button size={'large'} variant={'outlined'} onClick={clickGainWeight} sx={{ mb: 3 }}>
        Gain Weight
      </Button>
      <Button size={'large'} variant={'outlined'} onClick={clickLooseWeight}>
        Lose Weight
      </Button>
    </div>
  )
}
