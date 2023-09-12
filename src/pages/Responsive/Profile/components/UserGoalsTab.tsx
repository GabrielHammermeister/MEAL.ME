import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Modal,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import EmptyState from '@/components/EmptyState/EmptyState.index'
import noGoalSvg from '@/assets/goal.svg'
import { IconBase } from '@/components/IconBase/IconBase'
import FlagIcon from '@mui/icons-material/Flag'

export const UserGoalsTab = () => {
  const [goals, setGoals] = useState([
    {
      deadline: new Date().toLocaleDateString('pt-BR'),
      weightGoal: 90,
      type: 'Ganho de Peso',
    },
  ])
  const [selectedGoal, setSelectedGoal] = useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const openDeleteModal = (goal) => {
    setSelectedGoal(goal)
    setIsDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setSelectedGoal(null)
    setIsDeleteModalOpen(false)
  }

  const deleteGoal = () => {
    // Lógica para excluir a meta (remova da lista de metas, etc.)
    setGoals((prevGoals) => prevGoals.filter((goal) => goal !== selectedGoal))
    closeDeleteModal()
  }
  return (
    <>
      <main className='container mx-auto mt-4'>
        {goals.length === 0 ? (
          <EmptyState
            imgSrc={noGoalSvg}
            imgAlt={'user with no goal'}
            title={'You don\'t have a goal'}
            description={'Add a goal to your profile.'}
            handleOnClickButton={() => {}}
            buttonLabel={'Create goal'}
          />
        ) : (
          <Card className='bg-white p-4 mt-4 rounded-lg shadow-md'>
            {goals.map((goal) => (
              <>
                <CardHeader>
                  <IconBase>
                    {/* <FlatIcon src={svgDrinkSrc} size='sm' />*/}
                    <FlagIcon />
                  </IconBase>
                </CardHeader>
                <CardContent>
                  <Typography variant='subtitle1'>Prazo: {goal.deadline}</Typography>
                  <Typography variant='subtitle1'>Meta de Peso: {goal.weightGoal} Kg</Typography>
                  <Typography variant='subtitle1'>Tipo: {goal.type}</Typography>
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
            ))}
          </Card>
        )}

        {/* Modal para excluir meta */}
        <Modal
          open={isDeleteModalOpen}
          onClose={closeDeleteModal}
          aria-labelledby='modal-title'
          aria-describedby='modal-description'
        >
          <div className='bg-white p-4 rounded-lg shadow-md'>
            <Typography variant='h6' id='modal-title' className='mb-3'>
              Confirmar Exclusão de Meta
            </Typography>
            <Typography variant='body1' id='modal-description' className='mb-3'>
              Tem certeza de que deseja excluir esta meta?
            </Typography>
            <Button variant='contained' color='error' onClick={deleteGoal}>
              Excluir
            </Button>
            <Button variant='contained' onClick={closeDeleteModal} className='ml-2'>
              Cancelar
            </Button>
          </div>
        </Modal>
      </main>
    </>
  )
}
