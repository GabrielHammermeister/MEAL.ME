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

type Nutrients = Array<{ name: string; amount: number; unit: string }>
type Nutrient = { name: string; amount: number; unit: string }
type Macros = Array<Nutrient>

const IngredientPage = () => {
  const { id: ingredientId } = useParams()
  const [macros, setMacros] = useState<Macros>([])
  const [totalCalories, setTotalCalories] = useState<Nutrient>()
  const [caloricBreakdown, setCaloricBreakdown] = useState<number[]>()
  const [ingredientName, setIngredientName] = useState('-')

  const filterMacros = (nutrients: Nutrients) => {
    setMacros([])
    nutrients.forEach((nutrient) => {
      if (
        nutrient.name === 'Protein' ||
        nutrient.name === 'Fat' ||
        nutrient.name === 'Carbohydrates'
      ) {
        setMacros((prev) => {
          return [...prev, nutrient].sort((a, b) => {
            return a.name > b.name ? 1 : -1
          })
        })
      }
      if (nutrient.name === 'Calories') setTotalCalories(nutrient)
    })
  }

  const fetchIngredient = async () => {
    try {
      const {
        data: { nutrition, name },
      } = await getInformationById(ingredientId)
      setIngredientName(name)

      setCaloricBreakdown(toArray(nutrition.caloricBreakdown))

      filterMacros(nutrition.nutrients)
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
        <Paper>
          <Box
            p={2}
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            height='100%'
          >
            <Typography variant='subtitle2'>Macro Nutrients</Typography>

            <Box>
              {caloricBreakdown &&
                macros.map((macro, index) => (
                  <MacroProgressBar
                    key={generateKey()}
                    name={macro.name}
                    macroNutrient={{
                      amount: macro.amount,
                      unit: macro.unit,
                    }}
                    percent={caloricBreakdown[index]}
                  />
                ))}
            </Box>
            {totalCalories && (
              <Typography variant='overline'>
                Total calories: {totalCalories.amount} {totalCalories.unit.toUpperCase()}
              </Typography>
            )}
          </Box>
        </Paper>
        <TableContainer sx={{ maxWidth: '1000px' }} component={Paper}>
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
                {totalCalories && (
                  <TableCell>
                    {totalCalories.amount} {totalCalories.unit}
                  </TableCell>
                )}
              </TableRow>
              {macros.map((macro) => (
                <TableRow key={generateKey()}>
                  <TableCell>{macro.name} </TableCell>
                  <TableCell>
                    {macro.amount} {macro.unit}
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
