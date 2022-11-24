import { MacroNutrientProps } from "@/components/MacroProgressBar";
import { floor } from "lodash";

type filterMacrosArgs = {
  proteins: number;
  carbohydrates: number;
  fats: number;
  totalCalories: number;
};

type filterMacros = (args: filterMacrosArgs) => MacroNutrientProps[];

export const filterMacros: filterMacros = ({
  proteins,
  carbohydrates,
  fats,
  totalCalories,
}) => {
  const proteinMacro = {
    name: "Proteins",
    macroNutrient: {
      amount: proteins,
      unit: "g",
    },
    percent: floor(totalCalories / (proteins * 4)),
  };
  const carbsMacro = {
    name: "Carbohydrates",
    macroNutrient: {
      amount: carbohydrates,
      unit: "g",
    },
    percent: floor(totalCalories / (carbohydrates * 4)),
  };
  const fatsMacro = {
    name: "Fats",
    macroNutrient: {
      amount: fats,
      unit: "g",
    },
    percent: floor(totalCalories / (proteins * 9)),
  };
  return [proteinMacro, carbsMacro, fatsMacro];
};
