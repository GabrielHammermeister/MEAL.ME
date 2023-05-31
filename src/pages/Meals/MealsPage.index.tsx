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
          <div className='grid-dashboard'>
            {mealList.map(() => (
              <Meal key={generateKey()} mealData={{ id: 'iasdf' }} />
            ))}
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
          </div>
        </>
      )}
    </DefaultTemplate>
  )
}

export default MealsPage
