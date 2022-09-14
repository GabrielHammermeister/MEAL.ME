import useIngredients from "@/hooks/useIngredients";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { debounce } from "lodash";
import React, { useContext, useMemo } from "react";
// Contexts
// import { getIngredients } from "../../services/spoonacular.service";

function SearchIngredient() {
  const { setIngredients } = useIngredients();
  const debouncedHandleChange = useMemo(
    () => debounce(handleChange, 500),
    [handleChange]
  );

  function handleChange(query: string) {
    if (query !== "") {
      setIngredients([]);
      //   getIngredients(query)
      //     .then((res: { data: { results: any } }) => {
      //       setIngredients(res.data.results);
      //     })
      //     .catch((err: any) => console.error(err));
    }
  }

  return (
    <>
      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="search-food">Search</InputLabel>
        <OutlinedInput
          id="search-food"
          type="text"
          label="Search"
          onChange={(e) => debouncedHandleChange(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <SearchRoundedIcon />
            </InputAdornment>
          }
        />
      </FormControl>
    </>
  );
}

export default SearchIngredient;
