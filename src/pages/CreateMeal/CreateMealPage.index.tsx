import React, { useState } from "react";
import DefaultTemplate from "@/templates/Default/Default.index";
import {
  Backdrop,
  Button,
  Divider,
  Fade,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import "./CreateMealPage.styles.css";
import MacroProgressBar from "@/components/MacroProgressBar";
import SearchIngredient from "@/components/SearchIngredient/SearchIngredient";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import DisplayIngredients from "@/components/DisplayIngredients/DisplayIngredients";
import Input from "@/components/Molecules/Input/Input.index";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const CreateMealPage = () => {
  const [ingredientModalOpened, setIngredientModalOpened] = useState(false);

  return (
    <DefaultTemplate>
      <Typography variant="h4">Create a Meal</Typography>
      <main className="dashboard-container">
        <Box>
          <Input
            icon={<SearchRoundedIcon />}
            label="Search"
            onChange={() => console.log("search")}
          />
          <DisplayIngredients variant="small" />
        </Box>
        <Paper>
          <Box
            p={3}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height="100%"
          >
            <Typography variant="h6" paddingBottom={1}>
              Macro Nutrients
            </Typography>
            <Box>
              <MacroProgressBar
                name={"Proteins"}
                macroNutrient={{
                  amount: 10,
                  unit: "g",
                }}
                percent={20}
              />
              <MacroProgressBar
                name={"Carbohydrates"}
                macroNutrient={{
                  amount: 30,
                  unit: "g",
                }}
                percent={30}
              />
              <MacroProgressBar
                name={"Fats"}
                macroNutrient={{
                  amount: 40,
                  unit: "g",
                }}
                percent={50}
              />
            </Box>
            <Typography variant="overline" mb={2}>
              Total calories: 330 kcal
            </Typography>
            <Divider variant="fullWidth" />
            <Typography variant="h6" mt={2} paddingBottom={1}>
              Ingredients
            </Typography>

            <DisplayIngredients variant="small" />
            <Box mt={1} width="100%">
              <Button variant="contained" fullWidth>
                create meal
              </Button>
            </Box>
          </Box>
        </Paper>
      </main>
    </DefaultTemplate>
  );
};

export default CreateMealPage;
