import React, { useEffect } from 'react'
import DefaultTemplate from '@/templates/Default/Default.index'
import { Button, Divider, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import './CreateMealPage.styles.css'
import MacroProgressBar from '@/components/MacroProgressBar'

import DisplayIngredients from '@/components/DisplayIngredients/DisplayIngredients'
import SearchIngredient from '@/components/SearchIngredient/SearchIngredient'
import { MealTypeSelect } from '@/components/MealTypeSelect/MealTypeSelect'
import { MacroSummary } from '@/components/MacroSummary/MacroSummary'
import useIngredients from '@/hooks/useIngredients'

const MOCK_MACROS = {
  calories: 123,
  fats: {
    amount: 100,
    unit: 'g',
    percent: 30,
  },
  carbs: {
    amount: 50,
    unit: 'g',
    percent: 40,
  },
  proteins: {
    amount: 80,
    unit: 'g',
    percent: 30,
  },
}
const CreateMealPage = () => {
  const { setIngredients } = useIngredients()

  useEffect(() => {
    return () => {
      setIngredients([])
    }
  }, [])

  return (
    <DefaultTemplate>
      <Typography variant='h4'>Create a Meal</Typography>
      <main className='dashboard-container'>
        <Box>
          <SearchIngredient />
          <MealTypeSelect />
          <DisplayIngredients variant='small' />
        </Box>
        <Paper>
          <Box
            p={3}
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            height='100%'
          >
            <Typography variant='h6' paddingBottom={1}>
              Macro Nutrients
            </Typography>
            <MacroSummary macros={MOCK_MACROS} />
            <Divider variant='fullWidth' />
            <Typography variant='h6' mt={2} paddingBottom={1}>
              Ingredients
            </Typography>

            {/* <DisplayIngredients variant='small' /> */}
            <Box mt={1} width='100%'>
              <Button variant='contained' fullWidth>
                create meal
              </Button>
            </Box>
          </Box>
        </Paper>
      </main>
    </DefaultTemplate>
  )
}

export default CreateMealPage
