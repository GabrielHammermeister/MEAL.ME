import React from "react";
import DefaultTemplate from "@/templates/Default/Default.index";
import { Box, Typography } from "@mui/material";
import { IngredientProvider } from "@/providers/Ingredient.provider";
import SearchIngredient from "@/components/SearchIngredient/SearchIngredient";
import DisplayIngredients from "@/components/DisplayIngredients/DisplayIngredients";

const FindIngredientsPage = () => {
  return (
    <IngredientProvider>
      <DefaultTemplate>
        <Typography variant="h4">Find Ingredients</Typography>
        <div>
          <div className="input-wrapper">
            <Box bgcolor={"white"} p={2} borderRadius={1}>
              <SearchIngredient />
            </Box>
          </div>
          <DisplayIngredients />
        </div>
      </DefaultTemplate>
    </IngredientProvider>
  );
};

export default FindIngredientsPage;
