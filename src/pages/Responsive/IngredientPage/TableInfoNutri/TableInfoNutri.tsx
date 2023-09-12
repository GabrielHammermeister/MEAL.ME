import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { generateKey } from '@/utils/generateKey'
import React from 'react'
import { MacroSummary, Nutrient } from '@/pages/Responsive/IngredientPage/IngredientPage'

interface TableInfoNutriProps {
  macroNutrients: MacroSummary
  nutrients: Nutrient[]
}

export function TableInfoNutri({ macroNutrients, nutrients }: TableInfoNutriProps) {
  return (
    <>
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
    </>
  )
}
