import React, { useEffect, useReducer, useState } from 'react'
import { firebaseAuth } from '@/services/firebase/initializer'
import UserContext from './UserContext'
import { ApiUser, User } from '@/models'
import { createUsers, getUsers } from '@/services/mealApi/userService'
import { Nullable } from '@/types'

interface UserProviderProps {
  children: React.ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  // const { currentUser } = userReducer({})
  // useReducer(userReducer, {})

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const userUID = user.uid
        const apiUser = await getUsers(userUID)

        // verify if there is an user on the mealme database
        if (!apiUser) {
          const newUser: Nullable<ApiUser> = {
            activityLevel: null,
            basalMetabolicRate: 0,
            birthDate: '',
            goals: {},
            height: 0,
            meals: {},
            name: user.displayName || '',
            sex: null,
            weight: 9999,
          }
          await createUsers(newUser, userUID)
          const contextUser = { ...newUser, user }
          setCurrentUser(contextUser as unknown as User)
        } else {
          // user exists
          const contextUser = { ...apiUser, user }
          setCurrentUser(contextUser as unknown as User)
        }
      } else {
        // user logged out
        console.log('USER DES-LOGOU', user)
        setCurrentUser(null)
      }
    })

    return () => {
      // Clean up the subscription when the component unmounts
      unsubscribe()
    }
  }, [])

  return <UserContext.Provider value={{ currentUser }}>{children}</UserContext.Provider>
}
