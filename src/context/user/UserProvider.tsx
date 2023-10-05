import React, { useEffect, useState } from 'react'
import { firebaseAuth } from '@/services/firebase/initializer'
import UserContext from './UserContext'
import { ApiUser, User } from '@/models'
import { createUsers, getUsers } from '@/services/mealApi/userService'

interface UserProviderProps {
  children: React.ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<ApiUser | null>(null)

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const apiUser = await getUsers(user?.uid)
        if (!apiUser) {
          const newUser: ApiUser = {
            activityLevel: undefined,
            basalMetabolicRate: '',
            birthDate: '',
            goals: undefined,
            height: 0,
            meals: undefined,
            name: user.displayName || '',
            sex: undefined,
            weight: 0,
          }
          await createUsers(newUser)
          const contextUser = { ...newUser, user }
          setCurrentUser(contextUser as unknown as User)
          console.log('USUARIO NOVO', contextUser)
        }
      } else {
        // cria novo user-mealApi
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
