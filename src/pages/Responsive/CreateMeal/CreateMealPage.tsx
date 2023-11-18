import React, { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import './CreateMealPage.styles.css'
import { Ingredient } from '@/context/Ingredient.provider'
import { generateKey } from '@/utils/generateKey'
import useIngredients from '@/hooks/useIngredients'
import { MealStateType } from './types'
import { MealTypeSelect } from '@/components/MealTypeSelect/MealTypeSelect'
import SearchIngredient from '@/components/SearchIngredient/SearchIngredient'
import DisplayIngredients from '@/components/DisplayIngredients/DisplayIngredients'
import { ResponsiveLayout } from '@/templates/ResponsiveLayout/ResponsiveLayout'
import { PageTitle } from '@/components/PageTitle/PageTitle'
import EmptyState from '@/components/EmptyState/EmptyState.index'
import emptyBoxSrc from '@/assets/empty-box.svg'
import useCurrentUser from '@/hooks/useCurrentUser'
import { Add } from '@mui/icons-material'
import { getInformationByIdWithAmount } from '@/services/spoonacular/spoonacular.service'
import { calculateTotalMacros } from '@/utils/calculateTotalMacros'
import { MacroSummary } from '@/components/MacroSummary/MacroSummary'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/router/Router'

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

const mealStateInit: MealStateType = {
  name: '',
  macroNutrients: {
    calories: 0,
    carbs: { amount: 0, unit: 'g', percent: 0 },
    fats: { amount: 0, unit: 'g', percent: 0 },
    proteins: { amount: 0, unit: 'g', percent: 0 },
  },
  ingredients: [],
}

export const CreateMealPage = () => {
  const { setIngredients } = useIngredients()
  const navigate = useNavigate()
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null)
  const [selectedAmount, setSelectedAmount] = useState(100)
  const { currentUser } = useCurrentUser()
  const [ingredientMacros, setIngredientMacros] = useState()
  const [totalMacros, setTotalMacros] = useState(null)
  const [loadingIngredientMacros, setLoadingIngredientMacros] = useState(true)
  const [mealType, setMealType] = useState()

  const [open, setOpen] = useState(false)
  // const [mealState, dispatch] = useReducer<Reducer<MealStateType, Action>>(
  //   mealReducer,
  //   mealStateInit,
  // )
  const [mealState, setMealState] = useState<any>()
  const [mealName, setMealName] = useState('')

  const handleMealNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMealName(event.target.value)
  }
  // console.log('MEAL STATE', mealState)
  //
  // type IngredientType = typeof selectedIngredient
  //

  //

  //

  //

  const handleCreateMeal = () => {
    const storedMeals = localStorage.getItem('meals')
    let mealsToSave = []

    if (storedMeals) {
      // If meals exist in localStorage, parse them and append the new meal
      mealsToSave = JSON.parse(storedMeals)
      mealsToSave.push({ ...mealState, name: mealName, type: mealType, createdAt: new Date() })
    } else {
      // If no meals exist, save the new meal as the only meal
      mealsToSave = [{ ...mealState, name: mealName, type: mealType, createdAt: new Date() }]
    }

    // Save the updated meals array back to localStorage

    console.log('mealsToSave', mealsToSave)
    localStorage.setItem('meals', JSON.stringify(mealsToSave))
    navigate(ROUTES.RESPONSIVE.MEALS)
  }
  //
  // async function selectedIngredientChanged(amount: number) {
  //   setSelectedAmount(amount)
  //   const {
  //     data: { nutrition },
  //   } = await getInformationByIdWithAmount(selectedIngredient?.id.toString(), amount)
  //
  //   // @ts-ignore
  //   setIngredientMacros()
  //   setLoadingIngredientMacros(false)
  // }
  //

  //
  useEffect(() => {
    return () => {
      setIngredients([])
    }
  }, [])

  function handleSelectIngredient(ingredient: Ingredient) {
    handleClickOpen()
    setSelectedIngredient(ingredient)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setSelectedIngredient(null)
    setOpen(false)
  }

  async function handleAddIngredient() {
    if (!selectedIngredient) return
    const {
      data: { nutrition },
    } = await getInformationByIdWithAmount(selectedIngredient.id.toString(), selectedAmount)

    setMealState((prevState) => {
      // {
      //   macros: {
      //     calories: prevState.calories,
      //       proteins: prevState.macroNutrients.protein,
      //       carbs: prevState.macroNutrients.protein,
      //       fats: prevState.macroNutrients.protein,
      //   }
      // }
      const { macros } = calculateTotalMacros(nutrition)
      setTotalMacros(macros)
      const prevMacros = prevState?.macroNutrients
      const prevCalories = prevState?.calories
      const prevIngredients = prevState?.ingredients
      console.log('prevState', prevState)
      let newState = {}

      if (prevMacros && prevIngredients.length > 0) {
        newState = {
          id: generateKey(),
          name: mealName,
          counter: 0,
          checkpoints: [],
          ingredients: [...prevIngredients, selectedIngredient],
          calories: prevCalories + macros.calories,
          macroNutrients: {
            protein: {
              amount: prevMacros.protein.amount + macros.proteins,
            },
            fat: prevMacros.fat + macros.fats,
            carbohydrate: prevMacros.carbohydrate + macros.carbs,
          },
        }
      } else {
        newState = {
          id: generateKey(),
          name: mealName,
          counter: 0,
          checkpoints: [],
          ingredients: [selectedIngredient],
          calories: macros.calories,
          macroNutrients: {
            protein: macros.proteins,
            fat: macros.fats,
            carbohydrate: macros.carbs,
          },
        }
      }
      console.log('NEW MEAL', newState)

      return newState
    })

    handleClose()
  }

  const extractMacroData = () => {
    const { calories, macroNutrients } = mealState
    const { protein, fat, carbohydrate } = macroNutrients

    console.log('macroNutrients', macroNutrients)

    return {
      calories,
      fats: {
        ...fat,
      },
      proteins: {
        ...protein,
      },
      carbs: {
        ...carbohydrate,
      },
    }
  }
  return (
    <ResponsiveLayout>
      <PageTitle text={'Create a Meal'} />
      <main className='dashboard-container'>
        <Box>
          <SearchIngredient />

          <MealTypeSelect setMealType={setMealType} />
          <DisplayIngredients variant='small' handleSelectIngredient={handleSelectIngredient} />
        </Box>
        <Paper>
          <Box
            p={3}
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            height='100%'
          >
            {!mealState ? (
              <>
                <EmptyState
                  imgSrc={emptyBoxSrc}
                  imgAlt={'No ingredients'}
                  title={'No Ingredients to show'}
                  description={'Add a ingredient to display the macro-nutrients'}
                />
              </>
            ) : (
              <>
                <Typography variant='h6' paddingBottom={1}>
                  Macro Nutrients
                </Typography>

                <MacroSummary macros={totalMacros} />
                <Divider variant='fullWidth' />
                <Typography variant='h6' mt={2} paddingBottom={1}>
                  Ingredients
                </Typography>

                {/* <DisplayIngredients variant='small' /> */}
                {mealState.ingredients.map((ingredient) => (
                  <h6 key={generateKey()}>
                    {ingredient.name} {ingredient.amount} {ingredient.unit}
                  </h6>
                ))}
                <TextField
                  label='Meal Name'
                  variant='outlined'
                  value={mealName}
                  onChange={handleMealNameChange}
                />
                <Box mt={1} width='100%'>
                  <Button variant='contained' fullWidth onClick={handleCreateMeal}>
                    create meal
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Paper>
      </main>

      <Dialog open={open} onClose={handleClose} sx={{ p: 3 }}>
        <DialogTitle>{selectedIngredient?.name}</DialogTitle>
        <FormControl>
          <DialogContent>
            <TextField
              label='Amount'
              sx={{ m: 1, width: '25ch' }}
              type={'number'}
              helperText={'Insert a amount for the ingredient'}
              InputProps={{
                endAdornment: <InputAdornment position='start'>g</InputAdornment>,
              }}
              value={selectedAmount}
              onChange={(e) => setSelectedAmount(Number(e.target.value))}
            />
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button
              // @ts-ignore
              onClick={() => handleAddIngredient(selectedIngredient)}
              startIcon={<Add />}
              type={'submit'}
              variant={'outlined'}
            >
              Add
            </Button>
          </DialogActions>
        </FormControl>
      </Dialog>
    </ResponsiveLayout>
  )
}
