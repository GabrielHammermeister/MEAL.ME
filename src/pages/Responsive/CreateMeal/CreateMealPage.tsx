import React, { Reducer, useEffect, useReducer, useState } from 'react'
import DefaultTemplate from '@/templates/Default/Default.index'
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

import DisplayIngredients from '@/components/DisplayIngredients/DisplayIngredients'
import SearchIngredient from '@/components/SearchIngredient/SearchIngredient'
import { MealTypeSelect } from '@/components/MealTypeSelect/MealTypeSelect'
import { MacroSummary } from '@/components/MacroSummary/MacroSummary'
import useIngredients from '@/hooks/useIngredients'
import { Add } from '@mui/icons-material'
import { Action, MealStateType } from './types'
import { mealReducer } from '@/pages/CreateMeal/reducers'
import { generateKey } from '@/utils/generateKey'
import { calculateTotalMacros } from '@/utils/calculateTotalMacros'
import { getInformationByIdWithAmount } from '@/services/spoonacular/spoonacular.service'
import EmptyState from '@/components/EmptyState/EmptyState.index'
import emptyBoxSrc from '@/assets/empty-box.svg'
import { ResponsiveLayout } from '@/templates/ResponsiveLayout/ResponsiveLayout'
import { PageTitle } from '@/components/PageTitle/PageTitle'
import { Ingredient } from '@/context/Ingredient.provider'
import { createMeals } from '@/services/mealApi/mealsService';
import { Meal } from '@/services/mealApi/models/Meal';


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
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null)
  const [selectedAmount, setSelectedAmount] = useState(100)

  const [ingredientMacros, setIngredientMacros] = useState()
  const [totalMacros, setTotalMacros] = useState(null)
  const [loadingIngredientMacros, setLoadingIngredientMacros] = useState(true)

  const [mealState, dispatch] = useReducer<Reducer<MealStateType, Action>>(
    mealReducer,
    mealStateInit,
  );
  const [open, setOpen] = useState(false)

  type IngredientType = typeof selectedIngredient;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const {
  //       data: { nutrition },
  //     } = await getInformationByIdWithAmount('1015006', 100)
  //     // } = await getInformationByIdWithAmount(selectedIngredient.id.toString(), selectedAmount)
  //     // filtrar resultado da request (calculateMacros)
  //     const macros = calculateTotalMacros(nutrition)
  //   }
  //
  //   fetchData()
  // }, [])

  const handleClickOpen = () => {
    setOpen(true)
  }

  function handleSelectIngredient(ingredient: Ingredient) {
    handleClickOpen()
    setSelectedIngredient(ingredient)
  }
  async function handleAddIngredient() {
    if (!selectedIngredient) return;

    // Supondo que você obtenha os dados nutricionais do ingrediente aqui
    const { data: { nutrition } } = await getInformationByIdWithAmount(selectedIngredient.id.toString(), selectedAmount);
    
    // Calcular os macros usando sua função calculateTotalMacros
    const { macros } = calculateTotalMacros(nutrition);

    // Adicionar o ingrediente com os macros calculados ao estado da refeição
    dispatch({
      type: 'add-ingredient',
      payload: {
        ingredient: {
          ...selectedIngredient,
          amount: selectedAmount,
          unit: 'g',
          macros,
        },
      },
    });

    // Fechar o diálogo de seleção de ingredientes
    handleClose();

    // Recalcular os macros totais da refeição se necessário
    // Isso pode envolver somar os macros de todos os ingredientes no estado da refeição
  }

  const handleCreateMeal = async () => {
    // Suponha que você colete os ingredientes de algum lugar do seu estado
    const ingredientsObject: Record<string, Ingredient> = {};
    mealState.ingredients.forEach(ingredient => {
      ingredientsObject[ingredient.id] = ingredient;
    });
  
    // Suponha que você também colete os checkpoints de algum lugar do seu estado
    // ou os gere aqui. Vou criar um exemplo de checkpoints
    const checkpointsObject: Record<string, Checkpoint> = {
      'checkpoint1': { timestamp: new Date().toISOString() },
      // ... outros checkpoints
    };
  
    // Agora você vai construir o objeto de refeição baseado na interface Meal
    const mealData: Meal = {
      id: 'new-meal-id', // Um ID de refeição que você deve gerar ou obter de alguma forma
      calories: totalMacros.calories, // O total de calorias que você calculou
      checkpoints: checkpointsObject,
      ingredients: ingredientsObject,
      macroNutrients: {
        protein: totalMacros.protein,
        carbohydrate: totalMacros.carbohydrate,
        fat: totalMacros.fat,
      },
      name: mealState.name, // O nome da refeição que você obteve do usuário
    };
  
    try {
      await createMeals(mealData, 'userId'); // Substitua 'userId' pelo ID do usuário real
      // Adicione lógica após a criação da refeição
    } catch (error) {
      console.error('Error creating meal:', error);
      // Lide com erros aqui
    }
  };
  

  async function selectedIngredientChanged(amount: number) {
    setSelectedAmount(amount)
    const {
      data: { nutrition },
    } = await getInformationByIdWithAmount(selectedIngredient?.id.toString(), amount)

    // @ts-ignore
    setIngredientMacros()
    setLoadingIngredientMacros(false)
  }

  const handleClose = () => {
    setSelectedIngredient(null)
    setOpen(false)
  }

  useEffect(() => {
    return () => {
      setIngredients([])
    }
  }, [])

  return (
    <ResponsiveLayout>
      <PageTitle text={'Create a Meal'} />
      <main className='dashboard-container'>
        <Box>
          <SearchIngredient />
          <MealTypeSelect />
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
            {mealState?.ingredients.length <= 0 ? (
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

                <MacroSummary macros={mealState.macroNutrients} />
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
                <Box mt={1} width='100%'>
                  <Button variant='contained' fullWidth>
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
