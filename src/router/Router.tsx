import CreateMealPage from '@/pages/CreateMeal/CreateMealPage.index'
import FindIngredientsPage from '@/pages/FindIngredients/FindIngredientsPage.index'
import HomePage from '@/pages/Home/HomePage.index'
import IngredientPage from '@/pages/Ingredient/IngredientPage.index'
import LoginPage from '@/pages/Login/LoginPage.index'
import MealsPage from '@/pages/Meals/MealsPage.index'
import SignUpPage from '@/pages/SignUp/SignUpPage.index'
import { Fragment } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Validator from './Validator/Validator.index'
import { ProfilePage } from '@/pages/Profile/ProfilePage'
import { MealPage } from '@/pages/MealPage/MealPage'
import {
  FindIngredientsPage as RFindIngredientsPage,
  HomePage as RHomePage,
  IngredientPage as RIngredientPage,
  LoginPage as RLoginPage,
  MealsPage as RMealsPage,
  UserProfilePage as RProfilePage,
} from '@/pages/Responsive'

export const ROUTES = {
  HOME: 'home',
  INGREDIENTS: {
    INDEX: 'ingredients',
  },
  MEALS: {
    INDEX: 'meals',
    CREATE: 'create',
  },
  PROFILE: {
    INDEX: '/profile',
  },
  LOGIN: '/login',
  SIGNUP: '/sign-up',
  RESPONSIVE: {
    INGREDIENTS: 'ingredients',
  },
} as const

function Router() {
  return (
    <Fragment>
      <Routes>
        {/* Private Routes */}
        <Route element={<Validator />}>
          <Route index element={<HomePage />} />
          <Route path={ROUTES.MEALS.INDEX}>
            <Route index element={<MealsPage />} />
            <Route path={ROUTES.MEALS.CREATE} element={<CreateMealPage />} />
            <Route path=':id' element={<MealPage />} />
          </Route>

          <Route path={ROUTES.PROFILE.INDEX} element={<ProfilePage />} />
        </Route>

        <Route path={ROUTES.INGREDIENTS.INDEX}>
          <Route index element={<FindIngredientsPage />} />
          <Route path=':id' element={<IngredientPage />} />
        </Route>

        {/* Responsive Routes */}
        <Route path={'responsive'}>
          <Route index element={<RHomePage />} />
          <Route path={'ingredients'}>
            <Route index element={<RFindIngredientsPage />} />
            <Route path={':id'} element={<RIngredientPage />} />
          </Route>
          <Route path={'meals'}>
            <Route index element={<RMealsPage />} />
          </Route>
          <Route path={'profile'}>
            <Route index element={<RProfilePage />} />
          </Route>
          <Route path={'login'}>
            <Route index element={<RLoginPage />} />
          </Route>
        </Route>

        {/* Public Routes */}
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />
        <Route path={ROUTES.HOME} element={<Navigate to='/' replace />} />
      </Routes>
    </Fragment>
  )
}

export default Router
