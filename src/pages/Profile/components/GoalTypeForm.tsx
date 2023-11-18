import { Button } from '@mui/material'

type GoalTypeFormProps = {
  handleNextStep: () => void
}

export default function GoalTypeForm({ handleNextStep }: GoalTypeFormProps) {
  return (
    <div className={'step-container'}>
      <Button size={'large'} variant={'outlined'} onClick={handleNextStep} sx={{ mb: 3 }}>
        Gain Weight
      </Button>
      <Button size={'large'} variant={'outlined'} onClick={handleNextStep}>
        Lose Weight
      </Button>
    </div>
  )
}
