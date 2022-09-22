import React from "react";
import DefaultTemplate from "@/templates/Default/Default.index";
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import "./CreateMealPage.styles.css";
import MacroProgressBar from "@/components/MacroProgressBar";
import SearchIngredient from "@/components/SearchIngredient/SearchIngredient";

const CreateMealPage = () => {
  return (
    <DefaultTemplate>
      <Typography variant="h4">Create a Meal</Typography>
      <main className="dashboard-container">
        <SearchIngredient />
        <Paper>
          <Box
            p={3}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height="100%"
          >
            <Typography variant="h6">Macro Nutrients</Typography>
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
            <Typography variant="h6" mt={2}>
              Ingredients
            </Typography>
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 1,
                  }}
                >
                  <Typography variant="overline">Carrots</Typography>
                  <Typography variant="caption" color="GrayText">
                    100 g
                  </Typography>
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 1,
                  }}
                >
                  <Typography variant="overline">Chicken Breast</Typography>
                  <Typography variant="caption" color="GrayText">
                    150 g
                  </Typography>
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 1,
                  }}
                >
                  <Typography variant="overline">Rice</Typography>
                  <Typography variant="caption" color="GrayText">
                    100 g
                  </Typography>
                </ListItemButton>
              </ListItem>
            </List>
            <Button variant="contained">create meal</Button>
          </Box>
        </Paper>
        {/* <Paper>
          <Box
            p={2}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height="100%"
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h6">Carrots</Typography>
              <Typography variant="subtitle1">100 g</Typography>
            </Box>

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
              <Typography variant="overline">
                Total calories: 330 kcal
              </Typography>
            </Box>

            <Button variant="contained">Add ingredient</Button>
          </Box>
        </Paper> */}
      </main>
    </DefaultTemplate>
  );
};

export default CreateMealPage;
