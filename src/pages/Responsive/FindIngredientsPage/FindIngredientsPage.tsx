import React from 'react'
import DisplayIngredients from '@/components/DisplayIngredients/DisplayIngredients'
// import useIngredients from '@/hooks/useIngredients'
import SearchIngredient from '@/components/SearchIngredient/SearchIngredient'
import { ResponsiveLayout } from '@/templates/ResponsiveLayout/ResponsiveLayout'
import { PageTitle } from '@/components/PageTitle/PageTitle'

export const FindIngredientsPage = () => {
  // const { setIngredients } = useIngredients()

  return (
    <ResponsiveLayout>
      <PageTitle text={'Search Ingredients'} />
      <div>
        <div className='input-wrapper'>
          <SearchIngredient />
        </div>
        <DisplayIngredients variant='large' />
      </div>
    </ResponsiveLayout>
  )
}
