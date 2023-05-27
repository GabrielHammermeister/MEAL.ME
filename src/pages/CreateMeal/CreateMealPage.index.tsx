import React from 'react'
import DefaultTemplate from '@/templates/Default/Default.index'
import { Button, Divider, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import './CreateMealPage.styles.css'
import MacroProgressBar from '@/components/MacroProgressBar'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'

import DisplayIngredients from '@/components/DisplayIngredients/DisplayIngredients'
import Input from '@/components/Molecules/Input/Input.index'
import SearchIngredient from '@/components/SearchIngredient/SearchIngredient'

const CreateMealPage = () => {
  return (
    <DefaultTemplate>
      <Typography variant='h4'>Create a Meal</Typography>
      <main className='dashboard-container'>
        <Box>
          <SearchIngredient />
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
            <Box>
              <MacroProgressBar
                name={'Proteins'}
                macroNutrient={{
                  amount: 10,
                  unit: 'g',
                }}
                percent={20}
              />
              <MacroProgressBar
                name={'Carbohydrates'}
                macroNutrient={{
                  amount: 30,
                  unit: 'g',
                }}
                percent={30}
              />
              <MacroProgressBar
                name={'Fats'}
                macroNutrient={{
                  amount: 40,
                  unit: 'g',
                }}
                percent={50}
              />
            </Box>
            <Typography variant='overline' mb={2}>
              Total calories: 330 kcal
            </Typography>
            <Divider variant='fullWidth' />
            <Typography variant='h6' mt={2} paddingBottom={1}>
              Ingredients
            </Typography>

            <DisplayIngredients variant='small' />
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
