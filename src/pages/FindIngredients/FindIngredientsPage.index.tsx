import React, { useEffect } from "react";
import DefaultTemplate from "@/templates/Default/Default.index";
import { Box, Typography } from "@mui/material";
import SearchIngredient from "@/components/SearchIngredient/SearchIngredient";
import DisplayIngredients from "@/components/DisplayIngredients/DisplayIngredients";

const FindIngredientsPage = () => {
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <DefaultTemplate>
      <Typography variant="h4">Find Ingredients</Typography>
      <div>
        <div className="input-wrapper">
          <SearchIngredient />
        </div>
        <DisplayIngredients variant="large" />
      </div>
    </DefaultTemplate>
  );
};

export default FindIngredientsPage;
