import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import EmptyState from '@/components/EmptyState/EmptyState.index'
import noGoalSvg from '@/assets/goal.svg'
import { isEmpty } from '@/utils/isEmpty'
import useCurrentUser from '@/hooks/useCurrentUser'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/router/Router'
import { deleteGoal as requestDeleteGoal, getGoals } from '@/services/mealApi/goalsService'
import { Goal } from '@/models'
import { GoalType } from '@/consntants/enums/GoalType'
import { convertDateFormat } from '@/utils/convertDateFormat'

export const UserGoalsTab = () => {
  const [goal, setGoal] = useState<Goal | null>()
  const { currentUser, setCurrentUser } = useCurrentUser()
  const [selectedGoal, setSelectedGoal] = useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const goalsRes = await getGoals(currentUser?.uid)
        // @ts-ignore
        console.log('response', goalsRes)
        setGoal(goalsRes)
      } catch (err) {}
    }
    fetchdata()
  }, [currentUser])

  const openDeleteModal = (goal) => {
    setSelectedGoal(goal)
    setIsDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setSelectedGoal(null)
    setIsDeleteModalOpen(false)
  }

  const deleteGoal = async () => {
    try {
      if (currentUser?.uid) {
        await requestDeleteGoal(currentUser?.uid)
        setGoal(null)
      }
    } catch (err) {}
    closeDeleteModal()
  }

  function calculateMonthsUntilDeadline(deadline) {
    const currentDate = new Date()
    const deadlineDate = new Date(deadline)

    const timeDifference = deadlineDate.getTime() - currentDate.getTime()

    const millisecondsInMonth = 1000 * 60 * 60 * 24 * 30 // Approximate milliseconds in a month
    const monthsDifference = Math.floor(timeDifference / millisecondsInMonth)

    let message = `${monthsDifference} month${monthsDifference > 1 && 's'}`
    if (monthsDifference === 0) {
      message = 'Current Month'
    }

    return message
  }

  return (
    <>
      <main className='container mx-auto mt-4'>
        {isEmpty(goal) ? (
          <EmptyState
            imgSrc={noGoalSvg}
            imgAlt={'user with no goal'}
            title={"You don't have a goal"}
            description={'Add a goal to your profile.'}
            handleOnClickButton={() => navigate(ROUTES.RESPONSIVE.CREATE_GOAL)}
            buttonLabel={'Create goal'}
          />
        ) : (
          <Card className='bg-white p-4 mt-4 rounded-lg shadow-md'>
            {goal && (
              <>
                <CardContent>
                  <Typography className={'flex justify-between'} variant='subtitle1'>
                    Deadline:
                    <span>{calculateMonthsUntilDeadline(goal.deadline)}</span>
                  </Typography>
                  <Typography className={'flex justify-between'} variant='subtitle1'>
                    Initial weight:
                    <span>{goal.initialWeight} Kg</span>
                  </Typography>
                  <Typography className={'flex justify-between'} variant='subtitle1'>
                    Weight goal:
                    <span>{goal.weightGoal} Kg</span>
                  </Typography>
                  <Typography className={'flex justify-between mb-6'} variant='subtitle1'>
                    Type:
                    <span>{GoalType[goal.type]}</span>
                  </Typography>
                  <Typography className={'flex justify-between mb-6'} variant='subtitle1'>
                    Start Date:
                    <span>{convertDateFormat(goal.initialDate)}</span>
                  </Typography>
                  <Typography variant={'overline'}>
                    Daily calories recommended
                    <Typography variant={'subtitle1'}>{goal.dailyCalories} kcal</Typography>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    className={'ml-auto'}
                    variant='text'
                    color='error'
                    onClick={() => openDeleteModal(goal)}
                  >
                    Excluir Meta
                  </Button>
                </CardActions>
              </>
            )}
          </Card>
        )}

        <Dialog open={isDeleteModalOpen} onClose={closeDeleteModal}>
          <DialogTitle>Confirm Goal Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Typography variant='body1' id='modal-description' className='mb-3'>
                Are you sure you want to delete your goal? This action can not be reversed.
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant='text' color='error' onClick={deleteGoal}>
              Delete
            </Button>
            <Button variant='text' onClick={closeDeleteModal} className='ml-2'>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    </>
  )
}
