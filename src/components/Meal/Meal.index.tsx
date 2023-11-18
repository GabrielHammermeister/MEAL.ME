import {
  Badge,
  Button,
  Card,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  styled,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import './styles.css'
import { useNavigate } from 'react-router-dom'
import { IconBase } from '../IconBase/IconBase'
import svgDrinkSrc from '@/assets/icons/drink.svg'
import svgForkSrc from '@/assets/icons/fork.svg'
import { FlatIcon } from '../FlatIcon/FlatIcon'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import DeleteIcon from '@mui/icons-material/Delete'
import { ROUTES } from '@/router/Router'
import { convertDateFormat } from '@/utils/convertDateFormat'

const StyledCardActions = styled(CardActions)`
  display: flex;
  justify-content: space-between;
`

type MealProps = {
  mealData: {
    id: string
    name: string
    type: 'solid' | 'liquid'
    calories: number
    createdAt: string
  }
}

const Meal = ({ mealData, onMealDelete }: MealProps) => {
  const [mealCounter, setMealCounter] = useState(() => {
    const storedMeals = localStorage.getItem('meals')
    if (storedMeals) {
      const parsedMeals = JSON.parse(storedMeals)

      const savedMealCounter = parsedMeals.find((meal) => meal.id === mealData.id)
      return savedMealCounter?.counter
    }
  })
  const [openDialog, setOpenDialog] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const storedMeals = localStorage.getItem('meals')
    if (storedMeals) {
      const parsedMeals = JSON.parse(storedMeals)
      const updatedMeals = parsedMeals.map((meal) => {
        if (meal.id === mealData.id) {
          return {
            ...meal,
            counter: mealCounter,
          }
        }
        return meal
      })
      localStorage.setItem('meals', JSON.stringify(updatedMeals))
    }
  }, [mealCounter])

  function handleAddMealCounter() {
    setMealCounter((prev) => prev + 1)
  }

  function handleSeeMore() {
    navigate(mealData.id)
  }

  function handleIncrement() {
    setMealCounter((prev) => prev + 1)
  }

  function handleDecrement() {
    setMealCounter((prev) => (prev > 0 ? prev - 1 : 0))
  }

  function handleDelete() {
    setOpenDialog(true)
  }

  function handleClose() {
    setOpenDialog(false)
  }

  function handleConfirmDelete() {
    const storedMeals = localStorage.getItem('meals')
    if (storedMeals) {
      const parsedMeals = JSON.parse(storedMeals)
      const updatedMeals = parsedMeals.filter((meal) => meal.id !== mealData.id)
      localStorage.setItem('meals', JSON.stringify(updatedMeals))
      onMealDelete(updatedMeals)
      setOpenDialog(false)
    }
  }

  function handleNavigate() {
    navigate(ROUTES.RESPONSIVE.MEALS + '/' + mealData.id)
  }

  return (
    <div className={'flex gap-4'}>
      <Badge
        color='secondary'
        badgeContent={mealCounter}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        invisible={mealCounter === 0}
        className={'flex-1 '}
      >
        <Card
          className='flex w-full gap-3 px-6 py-3 border-gray-300 shadow-md border-[1px] border-solid rounded-2xl cursor-pointer hover:bg-slate-100'
          onClick={handleNavigate}
        >
          <div className='flex flex-col w-10 gap-3 justify-between'>
            {mealData.type === 'liquid' ? (
              <IconBase>
                <FlatIcon src={svgDrinkSrc} size='sm' />
              </IconBase>
            ) : (
              <IconBase>
                <FlatIcon src={svgForkSrc} size='sm' />
              </IconBase>
            )}
          </div>

          <div className='flex flex-col flex-grow h-full gap-1'>
            <div className='flex justify-between items-center w-full'>
              <h4 className='my-2 font-medium'>
                # <span className=''>{mealData.name}</span>
              </h4>
            </div>
            <span>calories: {mealData.calories} Kcal </span>
            <Typography variant={'overline'}>
              Created at {convertDateFormat(mealData.createdAt)}
            </Typography>
          </div>
        </Card>
      </Badge>
      <div className='flex flex-col justify-center items-end'>
        <IconButton onClick={handleIncrement}>
          <AddIcon />
        </IconButton>
        <IconButton onClick={handleDecrement}>
          <RemoveIcon />
        </IconButton>
        <IconButton onClick={handleDelete} className={'mt-2'}>
          <DeleteIcon />
        </IconButton>
      </div>

      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Confirmação de exclusão'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Deseja realmente excluir esta refeição?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} color='error' autoFocus>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Meal
