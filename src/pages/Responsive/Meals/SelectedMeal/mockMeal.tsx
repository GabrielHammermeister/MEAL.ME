export interface Checkpoint {
    time: string;
    note: string;
  }
  
  export interface Ingredient {
    name: string;
    quantity: number;
    unit: string;
  }
  
  export interface MacroNutrients {
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
  }
  
  export interface Meal {
    id: string;
    calories: number;
    checkpoints: Record<string, Checkpoint>;
    ingredients: Record<string, Ingredient>;
    macroNutrients: MacroNutrients;
    name: string;
  }
  
  // Dados mock para o `mealsData` com uso de Record
  const mealsData: Meal[] = [
    {
      id: '1',
      name: 'Red Smoothie',
      calories: 540,
      checkpoints: {
        'morning': { time: '07:00', note: 'Wake up' },
        'pre-workout': { time: '09:00', note: 'Before gym' },
        'post-workout': { time: '11:00', note: 'After gym' },
      },
      ingredients: {
        'strawberry': { name: 'Strawberry', quantity: 100, unit: 'grams' },
        'banana': { name: 'Banana', quantity: 1, unit: 'piece' },
        'almondMilk': { name: 'Almond Milk', quantity: 200, unit: 'ml' },
      },
      macroNutrients: {
        calories: 540,
        proteins: 20,
        carbs: 90,
        fats: 15,
      },
    },
    {
      id: '2',
      name: 'Pasta and Chicken',
      calories: 710,
      checkpoints: {
        'lunch': { time: '13:00', note: 'Lunch time' },
        'dinner': { time: '19:00', note: 'Dinner time' },
      },
      ingredients: {
        'pasta': { name: 'Pasta', quantity: 85, unit: 'grams' },
        'chickenBreast': { name: 'Chicken Breast', quantity: 150, unit: 'grams' },
        'oliveOil': { name: 'Olive Oil', quantity: 1, unit: 'tbsp' },
      },
      macroNutrients: {
        calories: 710,
        proteins: 55,
        carbs: 85,
        fats: 22,
      },
    },
  ];
  
  export default mealsData;
  