import {
  Badge,
  Card,
  CardActions,
  styled,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material'
import React, { useState } from 'react'
import './styles.css'
import { useNavigate } from 'react-router-dom'
import { IconBase } from '../IconBase/IconBase'
import svgDrinkSrc from '@/assets/icons/drink.svg'
import svgForkSrc from '@/assets/icons/fork.svg'
import { FlatIcon } from '../FlatIcon/FlatIcon'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import DeleteIcon from '@mui/icons-material/Delete'

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
  }
}

const Meal = ({ mealData }: MealProps) => {
  const [mealCounter, setMealCounter] = useState(0)
  const [openDialog, setOpenDialog] = useState(false)
  const navigate = useNavigate()

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
    // colocar a logica de exclusao
    console.log('SUMIII')
    setOpenDialog(false)
  }

  return (
    <>
      <Badge
        color='secondary'
        badgeContent={mealCounter}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        invisible={mealCounter === 0}
      >
        <Card className='flex w-full gap-3 px-6 py-3 border-gray-300 shadow-md border-[1px] border-solid rounded-2xl h-28 cursor-pointer hover:bg-slate-100'>
          {/* <CardContent>
          <header className={'card-header'}>
            {mealData.type === 'liquid' ? <img src={'/water.svg'} /> : <img src={'/plate.svg'} />}
            <Typography variant={'subtitle2'} gutterBottom align={'center'}>
              {mealData.name}
            </Typography>
            <IconButton aria-label='add' onClick={handleAddMealCounter}>
              <Check />
            </IconButton>
          </header>
        </CardContent>
        <StyledCardActions sx={{ p: 2 }}>
          <Typography variant='overline' display='block' gutterBottom>
            {mealData.calories} kcal
          </Typography>
          <Button size='small' onClick={handleSeeMore}>
            See More
          </Button>
        </StyledCardActions> */}

          <div className='flex flex-col w-10 gap-3'>
            <IconBase>
              <FlatIcon src={svgForkSrc} size='sm' />
            </IconBase>
            <IconBase>
              <FlatIcon src={svgDrinkSrc} size='sm' />
            </IconBase>
          </div>

          <div className='flex flex-col flex-grow h-full gap-3'>
            <div className='flex justify-between items-center w-full'>
              <h4 className='my-2 font-medium'>
                #12 <span className=''>{mealData.name}</span>
              </h4>
              <IconButton onClick={handleDelete} size='small'>
                <DeleteIcon />
              </IconButton>
            </div>

            <span>Created at 12/07/2020</span>
          </div>

          <div className='flex flex-col justify-center items-end'>
            <IconButton onClick={handleIncrement}>
              <AddIcon />
            </IconButton>
            <IconButton onClick={handleDecrement}>
              <RemoveIcon />
            </IconButton>
          </div>
        </Card>
      </Badge>

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
    </>
  )
}

export default Meal
