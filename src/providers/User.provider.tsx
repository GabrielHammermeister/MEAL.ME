import { firebaseAuth } from '@/services/firebase/initializer'
import { User } from 'firebase/auth'
import React, { useEffect, useState } from 'react'

export const UserContext = React.createContext<UserContextValues | null>({
  currentUser: null,
  setCurrentUser: () => {},
})

export interface UserContextValues {
  currentUser: User | null
  setCurrentUser: React.Dispatch<User>
}

type UserProviderProps = {
  children: React.ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user)
      } else {
        setCurrentUser(null)
      }
    })
  }, [])

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
