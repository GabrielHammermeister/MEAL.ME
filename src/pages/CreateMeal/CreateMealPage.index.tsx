import React from "react";
import DefaultTemplate from "@/templates/Default/Default.index";
import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DisplayIngredients from "@/components/DisplayIngredients/DisplayIngredients";

const CreateMealPage = () => {
  return (
    <DefaultTemplate>
      <Typography variant="h4">Create a Meal</Typography>
      <DisplayIngredients variant="small" />
    </DefaultTemplate>
  );
};

export default CreateMealPage;
