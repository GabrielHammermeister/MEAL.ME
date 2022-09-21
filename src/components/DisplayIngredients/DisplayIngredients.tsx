import "./displayIngredients.css";
import React from "react";
import IngredientCard from "../IngredientCard/IngredientCard";
import { Ingredient } from "@/providers/Ingredient.provider";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

interface DisplayIngredientsProps {
  variant: "small" | "large";
}

const DisplayIngredients = ({ variant }: DisplayIngredientsProps) => {
  // const { ingredients } = useContext(IngredientContext);
  const ingredients: Ingredient[] = [{}, {}, {}, {}];
  return (
    <>
      {variant === "small" ? (
        <Box maxWidth={"50%"}>
          <List>
            {ingredients.map((value, index) => (
              <ListItemButton key={index}>
                <ListItem
                  disablePadding
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {/* <ListItemText primary="Item title" secondary="100 g" /> */}
                  <Typography variant="body2" fontWeight={500}>
                    Carrots
                  </Typography>
                  <Typography variant="body2" color="GrayText">
                    100 g
                  </Typography>
                </ListItem>
              </ListItemButton>
            ))}
          </List>
        </Box>
      ) : (
        <div className="container">
          <IngredientCard />
          <IngredientCard />
          <IngredientCard />
        </div>
      )}
    </>
  );
};

export default DisplayIngredients;
