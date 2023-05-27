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
import { Add, Mail } from '@mui/icons-material'
import './styles.css'

const StyledCardActions = styled(CardActions)`
  display: flex;
  justify-content: space-between;
`

const Meal = () => {
  const [mealCounter, setMealCounter] = useState(0)
  function handleAddMealCounter() {
    setMealCounter((prev) => prev + 1)
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
            <img src={'/water.svg'} />
            <Typography variant='h6' gutterBottom component='h6'>
              Heading 6
            </Typography>
            <IconButton aria-label='add' onClick={handleAddMealCounter}>
              <Add />
            </IconButton>
          </header>
        </CardContent>
        <StyledCardActions sx={{ p: 2 }}>
          <Typography variant='overline' display='block' gutterBottom>
            500 kcal
          </Typography>
          <Button size='small'>See More</Button>
        </StyledCardActions>
      </Card>
    </Badge>
  )
}

export default Meal
