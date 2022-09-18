import React from "react";
import DefaultTemplate from "@/templates/Default/Default.index";
import {
  Box,
  LinearProgress,
  LinearProgressProps,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import "./IngredientPage.styles.css";
import MacroProgressBar, {
  LinearProgressWithLabel,
} from "@/components/MacroProgressBar";

const IngredientPage = () => {
  const { id: ingredientId } = useParams();

  return (
    <DefaultTemplate>
      <Typography variant="h4">
        Your ingredient Page : {ingredientId}
      </Typography>

      <div className="grid-dashboard">
        <Paper>
          <Box p={2}>
            <Typography variant="subtitle2">Macro Nutrients</Typography>

            <MacroProgressBar
              name={"Proteins"}
              macroNutrient={{
                amount: 10,
                unit: "g",
              }}
              percent={20}
            />
            <MacroProgressBar
              name={"Carbohydrates"}
              macroNutrient={{
                amount: 30,
                unit: "g",
              }}
              percent={30}
            />
            <MacroProgressBar
              name={"Fats"}
              macroNutrient={{
                amount: 40,
                unit: "g",
              }}
              percent={50}
            />
            <Typography variant="overline">Total calories: 330 kcal</Typography>
          </Box>
        </Paper>
        <TableContainer sx={{ maxWidth: "1000px" }} component={Paper}>
          <Table width={100} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={2} align="center">
                  Informacao Nutricional ~ Porcao (100g)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2} align="left">
                  Quantidade por porcao
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Valor Energetico </TableCell>
                <TableCell>133 kcal</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Proteins </TableCell>
                <TableCell>10 g</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Carbs </TableCell>
                <TableCell>30 g</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fats </TableCell>
                <TableCell>40 g</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </DefaultTemplate>
  );
};

export default IngredientPage;
