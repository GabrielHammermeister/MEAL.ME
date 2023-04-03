import React, { useEffect, useMemo } from 'react'
import DefaultTemplate from '@/templates/Default/Default.index'
import { Box, Typography } from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'

import SearchIngredient from '@/components/SearchIngredient/SearchIngredient'
import DisplayIngredients from '@/components/DisplayIngredients/DisplayIngredients'
import Input from '@/components/Molecules/Input/Input.index'
import useIngredients from '@/hooks/useIngredients'
import { debounce } from 'lodash'
import { getIngredients } from '@/services/spoonacular/spoonacular.service'

const FindIngredientsPage = () => {
  const { setIngredients } = useIngredients()
  const debouncedHandleChange = useMemo(() => debounce(handleChange, 500), [handleChange])

  function handleChange(query: string) {
    console.log('🚀 ~ file: SearchIngredient.tsx ~ line 20 ~ handleChange ~ query', query)
    if (query !== '') {
      setIngredients([])
      console.log('request')
      getIngredients(query)
        .then((res: { data: { results: any } }) => {
          console.log('🚀 ~ file: SearchIngredient.tsx ~ line 31 ~ .then ~ res', res)

          setIngredients(res.data.results)
        })
        .catch((err: any) => console.error(err))
    }
  }

  return (
    <DefaultTemplate>
      <Typography variant='h4'>Find Ingredients</Typography>
      <div>
        <div className='input-wrapper'>
          <Input
            icon={<SearchRoundedIcon />}
            label='Search'
            onChange={(e) => debouncedHandleChange(e.target.value)}
          />
        </div>
        <DisplayIngredients variant='large' />
      </div>
    </DefaultTemplate>
  )
}

export default FindIngredientsPage
