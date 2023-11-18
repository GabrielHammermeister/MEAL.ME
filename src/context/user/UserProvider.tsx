import React, { useState } from 'react'
import UserContext from './UserContext'
import { User } from '@/models'

interface UserProviderProps {
  children: React.ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>{children}</UserContext.Provider>
  )
}
