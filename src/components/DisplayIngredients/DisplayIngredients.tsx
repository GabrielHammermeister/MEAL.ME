import './displayIngredients.css'
import React from 'react'
import IngredientCard from '../IngredientCard/IngredientCard'
import { Grid, List, ListItem, ListItemButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { generateKey } from '@/utils/generateKey'
import useIngredients from '@/hooks/useIngredients'
import EmptyState from '@/components/EmptyState/EmptyState.index'
import searchSrc from '@/assets/search-ingredient.svg'
import { Ingredient } from '@/providers/Ingredient.provider'

interface DisplayIngredientsProps {
  variant: 'small' | 'large'
  handleSelectIngredient?: (ingredient: Ingredient) => void
}

const DisplayIngredients = ({ variant, handleSelectIngredient }: DisplayIngredientsProps) => {
  const { ingredients } = useIngredients()

  if (ingredients.length === 0) {
    return (
      <EmptyState
        imgSrc={searchSrc}
        imgAlt={'No results found'}
        title={'No results to show'}
        description={'Type a valid ingredient to search'}
      />
    )
  }

  return (
    <>
      {variant === 'small' ? (
        <Box>
          <List>
            {handleSelectIngredient &&
              ingredients.map((value, index) => (
                <ListItemButton key={index} onClick={() => handleSelectIngredient(value)}>
                  <ListItem
                    disablePadding
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    {/* <ListItemText primary="Item title" secondary="100 g" /> */}
                    <Typography variant='body2' fontWeight={500}>
                      {value.name}
                    </Typography>
                  </ListItem>
                </ListItemButton>
              ))}
          </List>
        </Box>
      ) : (
        <div className='grid-wrapper'>
          <Grid container spacing={2} justifyContent='center'>
            {ingredients.map((ingredient) => (
              <Grid item key={generateKey()}>
                <IngredientCard ingredient={ingredient} />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </>
  )
}

export default DisplayIngredients
