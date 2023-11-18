import { Fragment } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import {
  CreateGoalPage as RCreateGoalPage,
  CreateMealPage as RCreateMealPage,
  FindIngredientsPage as RFindIngredientsPage,
  HomePage as RHomePage,
  IngredientPage as RIngredientPage,
  LoginPage as RLoginPage,
  MealsPage as RMealsPage,
  SignUpPage as RSignUpPage,
  UserProfilePage as RProfilePage,
} from '@/pages/Responsive'
import Validator from '@/router/Validator/Validator.index'

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
    INDEX: '/responsive',
    INGREDIENTS: '/responsive/ingredients',
    LOGIN: '/responsive/login',
    SIGNUP: '/responsive/sign-up',
    CREATE_GOAL: '/responsive/create-goal',
    PROFILE: '/responsive/profile',
    MEALS: '/responsive/meals',
  },
} as const

function Router() {
  return (
    <Fragment>
      <Routes>
        {/* Private Routes */}
        {/* <Route element={<Validator />}> */}
        {/*   <Route index element={<HomePage />} /> */}
        {/*   <Route path={ROUTES.MEALS.INDEX}> */}
        {/*     <Route index element={<MealsPage />} /> */}
        {/*     <Route path={ROUTES.MEALS.CREATE} element={<CreateMealPage />} /> */}
        {/*     <Route path=':id' element={<MealPage />} /> */}
        {/*   </Route> */}

        {/*   <Route path={ROUTES.PROFILE.INDEX} element={<ProfilePage />} /> */}
        {/* </Route> */}

        {/* <Route path={ROUTES.INGREDIENTS.INDEX}> */}
        {/*   <Route index element={<FindIngredientsPage />} /> */}
        {/*   <Route path=':id' element={<IngredientPage />} /> */}
        {/* </Route> */}

        {/* Responsive Routes */}
        <Route path={ROUTES.RESPONSIVE.INDEX} element={<Validator />}>
          <Route index element={<RHomePage />} />
          <Route path={'ingredients'}>
            <Route index element={<RFindIngredientsPage />} />
            <Route path={':id'} element={<RIngredientPage />} />
          </Route>
          <Route path={ROUTES.RESPONSIVE.MEALS}>
            <Route index element={<RMealsPage />} />
          </Route>
          <Route path={ROUTES.RESPONSIVE.PROFILE}>
            <Route index element={<RProfilePage />} />
          </Route>
          <Route path={ROUTES.RESPONSIVE.LOGIN}>
            <Route index element={<RLoginPage />} />
          </Route>
          <Route path={'createMeal'}>
            <Route index element={<RCreateMealPage />} />
          </Route>
          <Route path={ROUTES.RESPONSIVE.SIGNUP}>
            <Route index element={<RSignUpPage />} />
          </Route>
          <Route path={ROUTES.RESPONSIVE.CREATE_GOAL}>
            <Route index element={<RCreateGoalPage />} />
          </Route>
        </Route>

        {/* /!* Public Routes *!/ */}
        {/* <Route path={ROUTES.LOGIN} element={<LoginPage />} /> */}
        {/* <Route path={ROUTES.SIGNUP} element={<SignUpPage />} /> */}
        <Route path={'*'} element={<Navigate to='/responsive/login' replace />} />
      </Routes>
    </Fragment>
  )
}

export default Router
