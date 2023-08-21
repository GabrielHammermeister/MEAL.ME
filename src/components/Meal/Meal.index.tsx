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
import { IconBase } from '../IconBase/IconBase'
import { MealSVG } from '@/icons'
import svgMealSrc from '@/assets/icons/meal.svg'
import svgDrinkSrc from '@/assets/icons/drink.svg'
import svgForkSrc from '@/assets/icons/fork.svg'
import { FlatIcon } from '../FlatIcon/FlatIcon'

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
      <Card className=' flex w-full gap-3 px-6 py-3 border-gray-300 shadow-md border-[1px] border-solid rounded-2xl h-28'>
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
          <h4 className='my-2 font-medium'>
            #12 <span className=''>Meal name</span>
          </h4>

          <span>Created at 12/07/2020</span>
        </div>
      </Card>
    </Badge>
  )
}

export default Meal
