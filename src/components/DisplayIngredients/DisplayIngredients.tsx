import "./displayIngredients.css";
import React from "react";
import IngredientCard from "../IngredientCard/IngredientCard";

function DisplayIngredients() {
  // const { ingredients } = useContext(IngredientContext);

  return (
    <>
      <div className="container">
        <IngredientCard />
        <IngredientCard />
        <IngredientCard />
      </div>
    </>
  );
}

export default DisplayIngredients;
