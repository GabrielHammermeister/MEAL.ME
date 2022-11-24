import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import carrotsSrc from "@/assets/carrots.jpg";
import { ROUTES } from "@/router/Router";
import { Ingredient } from "@/providers/Ingredient.provider";

type IngredientCardProps = {
  ingredient: Ingredient;
};

function IngredientCard({ ingredient }: IngredientCardProps) {
  const navigate = useNavigate();
  const goToIngredient = () => {
    return navigate(String(ingredient.id));
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={goToIngredient}>
        <CardContent>
          <Typography variant="h5" component="div">
            {ingredient.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={goToIngredient}>
          SEE MORE
        </Button>
      </CardActions>
    </Card>
  );
}

export default IngredientCard;
