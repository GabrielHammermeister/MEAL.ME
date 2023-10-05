import { Meal } from '@/models/Meal'
import { Goal } from '@/models/Goal'
import { User as FirebaseAuthUser } from 'firebase/auth'

export interface ApiUser {
  activityLevel?: 'Light' | 'Moderate' | 'Active'
  basalMetabolicRate?: string
  birthDate?: string
  goals?: Record<string, Goal>
  height?: number
  meals?: Record<string, Meal>
  name: string
  sex?: 'Male' | 'Female' | 'Other'
  weight?: number
}

export interface User extends FirebaseAuthUser, ApiUser {}

/*

const exampleUser: User = {
  activityLevel: 'Moderate',
  basalMetabolicRate: '25500',
  birthDate: '2000-09-05',
  goals: {
    BG9kM2mYHqwvY6v6JAzH: {
      dailyCalories: 3000,
      weight: 100,
      macroNutrients: {
        carbohydrates: 230,
        protein: 150,
        fat: 20,
      },
    },
  },
  height: 191,
  meals: {
    mbxqde6NdvEt0PGUUVnY: {
      name: 'peixe',
      checkpoints: {
        '1': {
          timestamp: '2022-05-02T00:00:00.000Z',
        },
        '2': {
          timestamp: '2022-05-22T00:00:00.000Z',
        },
      },
      ingredients: {
        '1': {
          amount: 100,
          unit: 'grams',
          name: 'peixe',
          id: '12',
        },
        '2': {
          amount: 200,
          unit: 'grams',
          name: 'limão',
          id: '12',
        },
      },
      calories: 372,
      macroNutrients: {
        protein: 5,
        fat: 10,
        carbohydrate: 30,
      },
    },
  },
  name: 'Gabriel Hammer',
  sex: 'Male',
  weight: 120,
}

*/
