import EmptyState from '@/components/EmptyState/EmptyState.index'
import Meal from '@/components/Meal/Meal.index'
import { Button } from '@mui/material'
import React from 'react'

import './MealsPage.styles.css'
import emptyBoxSrc from '@/assets/empty-box.svg'
import { useNavigate } from 'react-router-dom'
import { Add } from '@mui/icons-material'
import { ResponsiveLayout } from '@/templates/ResponsiveLayout/ResponsiveLayout'
import { PageTitle } from '@/components/PageTitle/PageTitle'
import { generateKey } from '@/utils/generateKey'
import useMealListFromLocalStorage from '@/hooks/useMealListFromLocalStorage'

export const MealsPage = () => {
  const navigate = useNavigate()
  const [mealList, setMealList] = useMealListFromLocalStorage()

  const goToCreateMeal = () => {
    return navigate('/responsive/createMeal')
  }

  function handleAddMeal() {
    navigate('/responsive/createMeal')
  }

  return (
    <ResponsiveLayout>
      <PageTitle text='Your Meals' />
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
          {/* <div className='grid-dashboard-meals'> */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {mealList.map((value, index) => (
              <Meal
                key={generateKey()}
                mealData={{
                  id: value.id,
                  name: value.name,
                  calories: value.calories,
                  type: value.type,
                  createdAt: value.createdAt,
                }}
                onMealDelete={setMealList}
              />
            ))}
          </div>
          <section className='mt-8'>
            <Button
              size={'large'}
              variant={'contained'}
              onClick={handleAddMeal}
              startIcon={<Add />}
              className='w-full md:w-auto'
            >
              Add meal
            </Button>
          </section>
        </>
      )}
    </ResponsiveLayout>
  )
}
