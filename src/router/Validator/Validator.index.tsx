import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useCurrentUser from '@/hooks/useCurrentUser'

const Validator = () => {
  const { currentUser } = useCurrentUser()

  if (!currentUser) {
    return <Navigate to={'/responsive/login'} />
  }

  return <Outlet />
}

export default Validator
