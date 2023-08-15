import React, { useEffect } from 'react'
import DefaultTemplate from '@/templates/Default/Default.index'
import { Typography } from '@mui/material'
import DisplayIngredients from '@/components/DisplayIngredients/DisplayIngredients'
import useIngredients from '@/hooks/useIngredients'
import SearchIngredient from '@/components/SearchIngredient/SearchIngredient'

const FindIngredientsPage = () => {
  const { setIngredients } = useIngredients()
  // const debouncedHandleChange = useMemo(() => debounce(handleChange, 500), [handleChange])
  //
  // function handleChange(query: string) {
  //   if (query !== '') {
  //     setIngredients([])
  //     getIngredients(query)
  //       .then((res: { data: { results: IngredientPage[] } }) => {
  //         const ingredientList: IngredientPage[] = res.data.results
  //         setIngredients(ingredientList)
  //       })
  //       .catch((err) => console.error(err))
  //   }
  // }
  useEffect(() => {
    setIngredients([])
  }, [])

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
