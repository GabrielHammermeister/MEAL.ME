import React from "react";
// Components
import DefaultTemplate from "@/templates/Default/Default.index";
import DisplayIngredients from "@/components/DisplayIngredients/DisplayIngredients";
import SearchIngredient from "@/components/SearchIngredient/SearchIngredient";
// Contexts
import { IngredientProvider } from "@/providers/Ingredient.provider";
import { Typography } from "@mui/material";

import "./Home.styles.css";

const Home = () => {
  return (
    <>
      <IngredientProvider>
        <DefaultTemplate>
          <Typography variant="h4">Home Page</Typography>
          <div>
            <div className="input-wrapper">
              <SearchIngredient />
            </div>
            <DisplayIngredients />
          </div>
        </DefaultTemplate>
      </IngredientProvider>
    </>
  );
};

export default Home;
