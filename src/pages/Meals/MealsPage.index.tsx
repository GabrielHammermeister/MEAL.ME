import EmptyState from '@/components/EmptyState/EmptyState.index'
import Meal from '@/components/Meal/Meal.index'
import DefaultTemplate from '@/templates/Default/Default.index'
import { Button, Typography } from '@mui/material'
import React, { useState } from 'react'

import './MealsPage.styles.css'
import emptyBoxSrc from '@/assets/empty-box.svg'
import { useNavigate } from 'react-router-dom'
import { generateKey } from '@/utils/generateKey'
import { Add } from '@mui/icons-material'
import { ROUTES } from '@/router/Router'

const MealsPage = () => {
  const navigate = useNavigate()
  const [mealList, setMealList] = useState([1, 2, 3])

  const goToCreateMeal = () => {
    return navigate('/meals/create')
  }

  function handleAddMeal() {
    setMealList((prevState) => [...prevState, 1])
    navigate(ROUTES.MEALS.CREATE)
  }

  return (
    <DefaultTemplate>
      <Typography variant='h4'>Meals Page</Typography>
      {mealList.length === 0 ? (
        <EmptyState
          imgSrc={emptyBoxSrc}
          imgAlt='an empty box'
          title='You have no Meals!'
          description='Create a meal, so you can follow along with your diet daily.'
          buttonLabel='Create meal'
          handleOnClickButton={goToCreateMeal}
        />
      ) : (
        <>
          <div className='grid-dashboard-meals'>
            {/* {mealList.map(() => ( */}
            {/*   <Meal key={generateKey()} mealData={{ id: 'iasdf' }} /> */}
            {/* ))} */}

            <Meal
              // key={generateKey()}
              mealData={{ id: '1', name: 'Red Smothie', calories: 540, type: 'liquid' }}
            />
            <Meal
              // key={generateKey()}
              mealData={{ id: '2', name: 'Pasta and Chicken', calories: 710, type: 'solid' }}
            />
            <Meal
              // key={generateKey()}
              mealData={{ id: '3', name: 'Chicken and Rice', calories: 630, type: 'solid' }}
            />
            <Meal
              // key={generateKey()}
              mealData={{ id: '4', name: 'Green Juice', calories: 230, type: 'liquid' }}
            />
            <Meal
              // key={generateKey()}
              mealData={{ id: '5', name: 'Meat Balls', calories: 800, type: 'solid' }}
            />
            <Meal
              // key={generateKey()}
              mealData={{ id: '6', name: 'Purple Smothie', calories: 320, type: 'liquid' }}
            />
          </div>
          <section className={'button-container'}>
            <Button
              size={'large'}
              variant={'contained'}
              onClick={handleAddMeal}
              startIcon={<Add />}
            >
              Add meal
            </Button>
          </section>
        </>
      )}
    </DefaultTemplate>
  )
}

export default MealsPage
