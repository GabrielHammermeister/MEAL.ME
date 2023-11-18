import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardContent, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { MacroSummary as MacroSummaryComponent, MacroNutrient } from '@/components/MacroSummary/MacroSummary'

type MacroSummary = {
    calories: number;
    fats: MacroNutrient;
    carbs: MacroNutrient;
    proteins: MacroNutrient;
  };

export const SelectedMeal = () => {
  const navigate = useNavigate()

  // Certifique-se de que este mock corresponda à estrutura de MacroSummary
  const mockMacroNutrients: MacroSummary = {
    calories: 500,
    fats: { amount: 20, unit: 'g', percent: 35 },
    carbs: { amount: 50, unit: 'g', percent: 40 },
    proteins: { amount: 30, unit: 'g', percent: 25 },
  }

  const [macroNutrients, setMacroNutrients] = useState<MacroSummary>(mockMacroNutrients)
  const [loadingMacros, setLoadingMacros] = useState(false)

  // Objeto mock para simular os detalhes de uma refeição
  const mealDetails = {
    name: 'Mock Meal',
    creationDate: '2023-01-01',
    ingredients: {
      ingredient1: { name: 'Ingrediente 1', quantity: 100, unit: 'g' },
      ingredient2: { name: 'Ingrediente 2', quantity: 2, unit: 'g' },
    },
  }

  // Transforma os Record em arrays para mapeamento
  const ingredientsArray = Object.values(mealDetails.ingredients)

  return (
    <Card>
      <CardContent>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
          Back to Meals
        </Button>
        <Typography variant='h4'>{mealDetails.name}</Typography>
        <Typography color='textSecondary'>Created at {mealDetails.creationDate}</Typography>
        <Typography variant='h6'>Ingredients:</Typography>
        <ul>
          {ingredientsArray.map((ingredient, index) => (
            <li key={index}>
              {ingredient.quantity} {ingredient.unit} {ingredient.name}
            </li>
          ))}
        </ul>
        <Typography variant='h6'>Macronutrients:</Typography>
        <MacroSummaryComponent macros={macroNutrients} loading={loadingMacros} />
      </CardContent>
    </Card>
  )
}
