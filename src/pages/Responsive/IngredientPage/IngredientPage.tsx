import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import './IngredientPage.styles.css';
import { getInformationById } from '@/services/spoonacular/spoonacular.service';
import { MacroNutrient, MacroSummary as MacroSummaryComponent } from '@/components/MacroSummary/MacroSummary';
import { TableInfoNutri } from '@/pages/Responsive/IngredientPage/TableInfoNutri/TableInfoNutri';
import { PageTitle } from '@/components/PageTitle/PageTitle';
import { getIngredientImage } from '@/services/spoonacular/getIngredientImage.service';
import svgIconButtonSrc from '@/assets/icons/_IconButton_.svg';

interface Nutrient {
  name: string;
  amount: number;
  unit: string;
}

interface MacroSummary {
  calories: number;
  fats: MacroNutrient;
  carbs: MacroNutrient;
  proteins: MacroNutrient;
}

interface Nutrition {
  nutrients: Nutrient[];
  caloricBreakdown: {
    percentCarbs: number;
    percentFat: number;
    percentProtein: number;
  };
}

const Section: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <section className='py-4 bg-neutral-50 mx-[-14px] px-3.5 border-t-gray-500 border-t-2'>
    {children}
  </section>
);

export const IngredientPage: React.FC = () => {
  const navigate = useNavigate();
  const { id: ingredientId } = useParams();
  const [ingredientName, setIngredientName] = useState<string>('-');
  const [loadingMacros, setLoadingMacros] = useState<boolean>(true);
  const [imageURL, setImageURL] = useState<string>('');
  const [macroNutrients, setMacroNutrients] = useState<MacroSummary>({
    calories: 0,
    fats: { amount: 0, unit: '', percent: 0 },
    carbs: { amount: 0, unit: '', percent: 0 },
    proteins: { amount: 0, unit: '', percent: 0 },
  });
  const [nutrients, setNutrients] = useState<Nutrient[]>([]);

  const filterMacros = (nutrition: Nutrition) => {
    const { nutrients, caloricBreakdown } = nutrition;

    nutrients.forEach((nutrient) => {
      const update = { amount: nutrient.amount, unit: nutrient.unit };

      switch (nutrient.name) {
        case 'Protein':
          setMacroNutrients((prev) => ({
            ...prev,
            proteins: { ...update, percent: caloricBreakdown.percentProtein },
          }));
          break;
        case 'Fat':
          setMacroNutrients((prev) => ({
            ...prev,
            fats: { ...update, percent: caloricBreakdown.percentFat },
          }));
          break;
        case 'Carbohydrates':
          setMacroNutrients((prev) => ({
            ...prev,
            carbs: { ...update, percent: caloricBreakdown.percentCarbs },
          }));
          break;
        case 'Calories':
          setMacroNutrients((prev) => ({ ...prev, calories: nutrient.amount }));
          break;
        default:
          break;
      }
    });

    setLoadingMacros(false);
  };

  const fetchIngredient = async () => {
    try {
      const { data } = await getInformationById(ingredientId);
      setIngredientName(data.name);
      setNutrients(data.nutrition.nutrients.filter((n: Nutrient) => !['Fat', 'Protein', 'Carbohydrates', 'Calories'].includes(n.name) && n.amount > 0));
      filterMacros(data.nutrition);
      setImageURL(getIngredientImage(data.image));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchIngredient();
  }, []);

  return (
    <div className='flex flex-col relative'>
      <button onClick={() => navigate('..')} className="back-button">
        <img src={svgIconButtonSrc} alt="Voltar" />
      </button>
      <header className='flex justify-center py-4 pb-10 bg-emerald-600'>
        <div className='flex justify-center items-center outline-[#34d39938] outline-opacity-80 outline-8 outline h-36 w-36 rounded-full bg-white'>
          <img src={imageURL} alt={ingredientName} className='h-32 w-32 rounded-full object-cover' />
        </div>
      </header>
      <main className='pb-10 rounded-t-2xl bg-white mt-[-1.5rem] px-3.5'>
        <PageTitle text={ingredientName} />
        <Section>
          <Typography variant='subtitle2'>Macro Nutrients</Typography>
          <MacroSummaryComponent macros={macroNutrients} loading={loadingMacros} />
        </Section>
        <TableInfoNutri macroNutrients={macroNutrients} nutrients={nutrients} />
      </main>
    </div>
  );
};
