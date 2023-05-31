import React from 'react'
import { Navigate, Outlet, redirect } from 'react-router-dom'
import useCurrentUser from '@/hooks/useCurrentUser'
import { ROUTES } from '@/router/Router'

const Validator = () => {
  const { currentUser } = useCurrentUser()

  if (!currentUser) {
    return <Navigate to={'/login'} />
  }

  return <Outlet />
}

export default Validator
