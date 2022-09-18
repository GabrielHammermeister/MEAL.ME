import React from "react";
// Components
import DefaultTemplate from "@/templates/Default/Default.index";
import DisplayIngredients from "@/components/DisplayIngredients/DisplayIngredients";
import SearchIngredient from "@/components/SearchIngredient/SearchIngredient";
// Contexts
import { IngredientProvider } from "@/providers/Ingredient.provider";
import { Box, Typography } from "@mui/material";

import "./HomePage.styles.css";

const HomePage = () => {
  return (
    <DefaultTemplate>
      <Typography variant="h4">Home Page</Typography>
      <Typography variant="h4">content</Typography>
    </DefaultTemplate>
  );
};

export default HomePage;
