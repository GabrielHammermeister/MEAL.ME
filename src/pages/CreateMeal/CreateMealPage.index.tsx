import React from "react";
import DefaultTemplate from "@/templates/Default/Default.index";
import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";

const CreateMealPage = () => {
  return (
    <DefaultTemplate>
      <Typography variant="h4">Create a Meal</Typography>
      <Paper elevation={3} sx={{ height: "100%" }}></Paper>
    </DefaultTemplate>
  );
};

export default CreateMealPage;
