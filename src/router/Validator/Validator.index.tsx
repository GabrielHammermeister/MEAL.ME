import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import useCurrentUser from '@/hooks/useCurrentUser'
import { firebaseAuth } from '@/services/firebase/initializer'
import { createUsers, getUsers } from '@/services/mealApi/userService'
import { Nullable } from '@/types'
import { ApiUser, User } from '@/models'
import { ROUTES } from '@/router/Router'

const Validator = () => {
  const { currentUser, setCurrentUser } = useCurrentUser()
  const navigate = useNavigate()
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const userUID = user.uid
        const apiUser = await getUsers(userUID)
        // verify if there is an user on the mealme database
        if (!apiUser) {
          const newUser: Nullable<ApiUser> = {
            uid: userUID,
            activityLevel: null,
            basalMetabolicRate: '',
            birthDate: '',
            goals: {},
            height: 0,
            meals: {},
            name: user.displayName || '',
            sex: null,
            weight: 9999,
          }
          await createUsers(newUser, userUID)
          const contextUser = { ...newUser }
          console.log('USER CREATED: ', contextUser)
          setCurrentUser(contextUser as unknown as User)
          navigate(ROUTES.RESPONSIVE.INDEX)
        } else {
          // user exists
          const contextUser = {
            ...apiUser,
            uid: userUID,
          }
          console.log('USER LOGGED IN: ', contextUser)
          setCurrentUser(contextUser as unknown as User)
          navigate(ROUTES.RESPONSIVE.INDEX)
        }
      } else {
        // @ts-ignore
        setCurrentUser(null)
      }
    })

    return () => {
      // Clean up the subscription when the component unmounts
      unsubscribe()
    }
  }, [])

  return <Outlet />
}

export default Validator
