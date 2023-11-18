import useCurrentUser from '@/hooks/useCurrentUser'
import { Goal } from '@/models'
import { createGoal } from '@/services/mealApi/goalsService'
import { ROUTES } from '@/router/Router'
import { calculateCalorieDifference } from '@/utils/calculateCalorieDifference'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'

type DefineGoalFormProps = {
  handlePreviousStep: () => void
  createdGoal: any
  bmrValue: number
}

export default function Resume_Step({
  handlePreviousStep,
  createdGoal,
  bmrValue,
}: DefineGoalFormProps) {
  const navigate = useNavigate()
  const { currentUser } = useCurrentUser()

  function calculateDeadlineDate(currentDate: Date, deadlineInMonths: number): Date {
    const millisecondsPerDay = 24 * 60 * 60 * 1000 // Milliseconds in a day
    const currentTimestamp = currentDate.getTime() // Current timestamp in milliseconds

    // Calculate the deadline date based on the current date and the specified deadline in months
    const deadlineTimestamp = currentTimestamp + millisecondsPerDay * 30.44 * deadlineInMonths // Approximate months as 30.44 days
    const deadlineDate = new Date(deadlineTimestamp)

    return deadlineDate
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const currentDate = new Date() // Current date
    // @ts-ignore
    const deadlineDate = calculateDeadlineDate(currentDate, createdGoal.deadline)

    const newGoal = {
      ...createdGoal,
      deadline: deadlineDate.toISOString(),
      dailyCalories: calculateCalorieDifference(
        createdGoal.dailyCalories,
        createdGoal.deadline,
        createdGoal.weightGoal,
        createdGoal.initialWeight,
      ),
    } as Goal
    console.log('NEW GOAL: ', newGoal)

    try {
      await createGoal(newGoal as Goal, currentUser?.uid)
      navigate(ROUTES.RESPONSIVE.PROFILE)
    } catch (er) {}
  }

  return (
    <div className={'step-container'}>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className={'flex flex-col'}>
          <Typography variant={'overline'} sx={{ mb: 3 }}>
            Your daily calorie expenditure
            <Typography variant={'subtitle1'}>{Math.round(bmrValue)} kcal</Typography>
          </Typography>
          <Typography variant={'overline'} sx={{ mb: 3 }}>
            Your current weight
            <Typography variant={'subtitle1'}>{createdGoal.initialWeight} kg</Typography>
          </Typography>
          <Typography variant={'overline'} sx={{ mb: 10 }}>
            Recommended calorie consumption
            <Typography variant={'subtitle1'}>
              {calculateCalorieDifference(
                createdGoal.dailyCalories,
                createdGoal.deadline,
                createdGoal.weightGoal,
                createdGoal.initialWeight,
              )}{' '}
              kg
            </Typography>
          </Typography>
        </div>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 10 }}>
          <Button variant={'outlined'} onClick={handlePreviousStep}>
            Previous Step
          </Button>
          <Button type={'submit'} variant={'contained'}>
            FINISH
          </Button>
        </Box>
      </form>
    </div>
  )
}
