import React, { useMemo } from 'react'
import DefaultTemplate from '@/templates/Default/Default.index'
import { Typography } from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import DisplayIngredients from '@/components/DisplayIngredients/DisplayIngredients'
import Input from '@/components/Molecules/Input/Input.index'
import useIngredients from '@/hooks/useIngredients'
import { debounce } from 'lodash'
import { Ingredient } from '@/providers/Ingredient.provider'
import { getIngredients } from '@/services/spoonacular/spoonacular.service'
import SearchIngredient from '@/components/SearchIngredient/SearchIngredient'

const FindIngredientsPage = () => {
  // const { setIngredients } = useIngredients()
  // const debouncedHandleChange = useMemo(() => debounce(handleChange, 500), [handleChange])
  //
  // function handleChange(query: string) {
  //   if (query !== '') {
  //     setIngredients([])
  //     getIngredients(query)
  //       .then((res: { data: { results: Ingredient[] } }) => {
  //         const ingredientList: Ingredient[] = res.data.results
  //         setIngredients(ingredientList)
  //       })
  //       .catch((err) => console.error(err))
  //   }
  // }

  return (
    <DefaultTemplate>
      <Typography variant='h4'>Find Ingredients</Typography>
      <div>
        <div className='input-wrapper'>
          {/* <Input */}
          {/*   icon={<SearchRoundedIcon />} */}
          {/*   label='Search' */}
          {/*   onChange={(e) => debouncedHandleChange(e.target.value)} */}
          {/* /> */}
          <SearchIngredient />
        </div>
        <DisplayIngredients variant='large' />
      </div>
    </DefaultTemplate>
  )
}

export default FindIngredientsPage
