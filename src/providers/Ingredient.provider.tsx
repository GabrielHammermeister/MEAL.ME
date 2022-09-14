import React, { useState } from "react";

export const IngredientContext =
  React.createContext<IngredientContextValues | null>(null);

type Ingredient = {};

export interface IngredientContextValues {
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
}
type IngredientProviderProps = {
  children: React.ReactNode;
};

export const IngredientProvider = ({ children }: IngredientProviderProps) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  return (
    <IngredientContext.Provider
      value={{
        ingredients,
        setIngredients,
      }}
    >
      {children}
    </IngredientContext.Provider>
  );
};
