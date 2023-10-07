import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import { MacroSummary, Nutrient } from '@/pages/Responsive/IngredientPage/IngredientPage';

interface TableInfoNutriProps {
  macroNutrients: MacroSummary;
  nutrients: Nutrient[];
}

export const TableInfoNutri: React.FC<TableInfoNutriProps> = ({ macroNutrients, nutrients }) => {
  return (
    <TableContainer
      sx={{ maxWidth: '1000px', gridColumn: 'span 2', gridRow: 'span 2' }}
      component={Paper}
    >
      <Table size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2} align='center'>
              Informação Nutricional ~ Porção (100g)
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} align='left'>
              Quantidade por porção
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Valor Energético</TableCell>
            <TableCell>{macroNutrients.calories} kcal</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Carboidratos</TableCell>
            <TableCell>
              {macroNutrients.carbs.amount} {macroNutrients.carbs.unit}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Proteínas</TableCell>
            <TableCell>
              {macroNutrients.proteins.amount} {macroNutrients.proteins.unit}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Gorduras</TableCell>
            <TableCell>
              {macroNutrients.fats.amount} {macroNutrients.fats.unit}
            </TableCell>
          </TableRow>

          {nutrients.map((nutrient) => (
            <TableRow key={nutrient.name}>
              <TableCell>{nutrient.name}</TableCell>
              <TableCell>
                {nutrient.amount} {nutrient.unit}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
