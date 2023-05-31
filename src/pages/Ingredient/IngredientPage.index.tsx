import React, { useEffect, useState } from 'react'
import DefaultTemplate from '@/templates/Default/Default.index'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useParams } from 'react-router-dom'
import './IngredientPage.styles.css'
import MacroProgressBar from '@/components/MacroProgressBar'
import { getInformationById } from '@/services/spoonacular/spoonacular.service'
import { generateKey } from '@/utils/generateKey'
import { toArray } from 'lodash'
import { MacroNutrient, MacroSummary } from '@/components/MacroSummary/MacroSummary'

type Nutrients = Array<{ name: string; amount: number; unit: string }>
type Nutrient = { name: string; amount: number; unit: string }

type Macros = Array<Nutrient>

type Macro = {
  amount: number
  unit: string
  percent: number
}

type MacroSummary = {
  calories: number
  fats: MacroNutrient
  carbs: MacroNutrient
  proteins: MacroNutrient
}

interface Nutrition {
  nutrients: Nutrients
  caloricBreakdown: {
    percentCarbs: number
    percentFat: number
    percentProtein: number
  }
}

const IngredientPage = () => {
  const { id: ingredientId } = useParams()
  const [ingredientName, setIngredientName] = useState('-')
  const [loadingMacros, setLoadingMacros] = useState(true)

  // @ts-ignore
  const [macroNutrients, setMacroNutrients] = useState<MacroSummary>({})
  const [nutrients, setNutrients] = useState<Array<Nutrient>>([])

  const filterMacros = ({ nutrients, caloricBreakdown }: Nutrition) => {
    nutrients.forEach((nutrient) => {
      if (nutrient.name === 'Protein') {
        setMacroNutrients((prev) => ({
          ...prev,
          proteins: {
            amount: nutrient.amount,
            unit: nutrient.unit,
            percent: caloricBreakdown.percentProtein,
          },
        }))
      } else if (nutrient.name === 'Fat') {
        setMacroNutrients((prev) => ({
          ...prev,
          fats: {
            amount: nutrient.amount,
            unit: nutrient.unit,
            percent: caloricBreakdown.percentFat,
          },
        }))
      } else if (nutrient.name === 'Carbohydrates') {
        setMacroNutrients((prev) => ({
          ...prev,
          carbs: {
            amount: nutrient.amount,
            unit: nutrient.unit,
            percent: caloricBreakdown.percentCarbs,
          },
        }))
      } else if (nutrient.name === 'Calories') {
        setMacroNutrients((prev) => ({
          ...prev,
          calories: nutrient.amount,
        }))
      }
    })
    setLoadingMacros(false)
  }

  function omitMacros(nutrients: Array<any>) {
    const filter = ['Fat', 'Protein', 'Carbohydrates', 'Calories']
    return nutrients.filter((nutrient) => !filter.includes(nutrient.name) && nutrient.amount > 0)
  }

  const fetchIngredient = async () => {
    try {
      const res = await getInformationById(ingredientId)
      const {
        data: { nutrition, name },
      } = res

      setIngredientName(name)
      setNutrients(omitMacros(nutrition.nutrients))
      filterMacros(nutrition)
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    fetchIngredient()
  }, [])

  return (
    <DefaultTemplate>
      <Typography variant='h4'>{ingredientName}</Typography>

      <div className='grid-dashboard'>
        <Paper sx={{ gridColumn: 'span 2', gridRow: 'span 1' }}>
          <Box
            p={2}
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            height='100%'
          >
            <Typography variant='subtitle2'>Macro Nutrients</Typography>
            <MacroSummary macros={macroNutrients} loading={loadingMacros} />
          </Box>
        </Paper>
        <TableContainer
          sx={{ maxWidth: '1000px', gridColumn: 'span 2', gridRow: 'span 2' }}
          component={Paper}
        >
          <Table width={100} size='small' aria-label='a dense table'>
            <TableHead>
              <TableRow>
                <TableCell colSpan={2} align='center'>
                  Informacao Nutricional ~ Porcao (100g)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2} align='left'>
                  Quantidade por porcao
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Valor Energetico </TableCell>
                {macroNutrients && <TableCell>{macroNutrients.calories} kcal</TableCell>}
              </TableRow>
              <TableRow>
                <TableCell>Carbohydrates</TableCell>
                <TableCell>
                  {macroNutrients.carbs?.amount} {macroNutrients.carbs?.unit}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Proteins</TableCell>
                <TableCell>
                  {macroNutrients.proteins?.amount} {macroNutrients.proteins?.unit}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fats</TableCell>
                <TableCell>
                  {macroNutrients.fats?.amount} {macroNutrients.fats?.unit}
                </TableCell>
              </TableRow>

              {nutrients.map((nutrient) => (
                <TableRow key={generateKey()}>
                  <TableCell>{nutrient.name}</TableCell>
                  <TableCell>
                    {nutrient?.amount} {nutrient?.unit}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </DefaultTemplate>
  )
}

export default IngredientPage
