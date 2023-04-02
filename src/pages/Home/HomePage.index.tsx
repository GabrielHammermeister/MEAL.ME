import React, { useEffect } from "react";
// Components
import DefaultTemplate from "@/templates/Default/Default.index";
import DisplayIngredients from "@/components/DisplayIngredients/DisplayIngredients";
import SearchIngredient from "@/components/SearchIngredient/SearchIngredient";
// Contexts
import { IngredientProvider } from "@/providers/Ingredient.provider";
import { Box, Typography } from "@mui/material";

import "./HomePage.styles.css";
import useCurrentUser from "@/hooks/useCurrentUser";
import { getIngredients } from "@/services/spoonacular/spoonacular.service";

const HomePage = () => {
  const { currentUser } = useCurrentUser();

  return (
    <DefaultTemplate>
      <Typography variant="h4">
        Bem vindo {currentUser?.displayName?.toLocaleUpperCase()}!
      </Typography>
      <Typography variant="h4">content</Typography>
    </DefaultTemplate>
  );
};

export default HomePage;
