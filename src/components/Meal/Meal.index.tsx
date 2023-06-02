import {
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Icon,
  IconButton,
  Paper,
  styled,
  SvgIcon,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { Add, Check, Mail } from '@mui/icons-material'
import './styles.css'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/router/Router'
import { s } from 'msw/lib/glossary-de6278a9'

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
  const navigate = useNavigate()
  function handleAddMealCounter() {
    setMealCounter((prev) => prev + 1)
  }

  function handleSeeMore() {
    navigate(mealData.id)
  }

  return (
    <Badge
      color='secondary'
      badgeContent={mealCounter}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      invisible={mealCounter === 0}
    >
      <Card sx={{ width: '100%', height: 'fit-content' }}>
        <CardContent>
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
        </StyledCardActions>
      </Card>
    </Badge>
  )
}

export default Meal
