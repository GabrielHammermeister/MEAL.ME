import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { FormControl, InputLabel } from '@mui/material'
import React from 'react'
import Input from '../Molecules/Input/Input.index'
// Contexts
// import { getIngredients } from "../../services/spoonacular.service";

function SearchIngredient() {
  return (
    <>
      <FormControl fullWidth variant='outlined'>
        <InputLabel htmlFor='search-food'>Search</InputLabel>
        <Input
          onChange={() => console.log('seaching ... ')}
          icon={<SearchRoundedIcon />}
          label='Search'
        />
      </FormControl>
    </>
  )
}

export default SearchIngredient
