import EmptyState from '@/components/EmptyState/EmptyState.index'
import Meal from '@/components/Meal/Meal.index'
import DefaultTemplate from '@/templates/Default/Default.index'
import { Typography } from '@mui/material'
import React from 'react'

import './MealsPage.styles.css'
import emptyBoxSrc from '@/assets/empty-box.svg'
import { useNavigate } from 'react-router-dom'
import { generateKey } from '@/utils/generateKey'

const userMeals: never[] = []

const MealsPage = () => {
  const navigate = useNavigate()

  const goToCreateMeal = () => {
    return navigate('/meals/create')
  }

  return (
    <DefaultTemplate>
      <Typography variant='h4'>Meals Page</Typography>
      {userMeals.length === 0 ? (
        <EmptyState
          imgSrc={emptyBoxSrc}
          imgAlt='an empty box'
          title='You have no Meals!'
          description='Create a meal, so you can follow along with your diet daily.'
          buttonLabel='Create meal'
          handleOnClickButton={goToCreateMeal}
        />
      ) : (
        <div className='grid-dashboard'>
          {userMeals.map(() => (
            <Meal key={generateKey()} />
          ))}
        </div>
      )}
    </DefaultTemplate>
  )
}

export default MealsPage
