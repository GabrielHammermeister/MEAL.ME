import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { FormControl } from '@mui/material';
import React, { useMemo } from 'react';
import Input from '../Molecules/Input/Input.index';
import useIngredients from '@/hooks/useIngredients';
import { debounce } from 'lodash';
import { getIngredients } from '@/services/spoonacular/spoonacular.service';
import { Ingredient } from '@/context/Ingredient.provider';
// Contexts
// import { getIngredients } from "../../services/spoonacular.service";

function SearchIngredient() {
  const { setIngredients } = useIngredients()
  const debouncedHandleChange = useMemo(() => debounce(handleChange, 500), [handleChange])

  function handleChange(query: string) {
    if (query !== '') {
      setIngredients([])
      getIngredients(query)
        .then((res: { data: { results: Ingredient[] } }) => {
          const ingredientList: Ingredient[] = res.data.results
          setIngredients(ingredientList)
        })
        .catch((err) => console.error(err))
    }
  }

  return (
    <>
      <FormControl fullWidth variant='outlined'>
        {/* <InputLabel htmlFor='search-food'>Search</InputLabel> */}
        <Input
          onChange={(e) => debouncedHandleChange(e.target.value)}
          icon={<SearchRoundedIcon />}
          label='Search'
        />
      </FormControl>
    </>
  )
}

export default SearchIngredient
