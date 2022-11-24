import useIngredients from "@/hooks/useIngredients";
import { getIngredients } from "@/services/spoonacular/spoonacular.service";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { debounce } from "lodash";
import React, { useContext, useMemo } from "react";
import Input from "../Molecules/Input/Input.index";
// Contexts
// import { getIngredients } from "../../services/spoonacular.service";

function SearchIngredient() {
  return (
    <>
      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="search-food">Search</InputLabel>
        <Input
          onChange={(e) => console.log("seaching ... ")}
          icon={<SearchRoundedIcon />}
          label="Search"
        />
      </FormControl>
    </>
  );
}

export default SearchIngredient;
