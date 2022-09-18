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

function IngredientCard() {
  const navigate = useNavigate();
  const goToIngredient = () => {
    return navigate("5");
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={goToIngredient}>
        <CardMedia
          component="img"
          height="140"
          image={carrotsSrc}
          alt="carrots"
        />
        <CardContent>
          <Typography variant="h5" component="div">
            Carrots
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lorem ipsum dolor, sit amet.
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
