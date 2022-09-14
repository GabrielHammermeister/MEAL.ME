import {
  IngredientContext,
  IngredientContextValues,
} from "@/providers/Ingredient.provider";
import { useContext } from "react";

const useIngredients = () => {
  const { ingredients, setIngredients } = useContext(
    IngredientContext
  ) as IngredientContextValues;
  return {
    ingredients,
    setIngredients,
  };
};

export default useIngredients;
