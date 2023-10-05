import { ApiUser } from '@/models'
import { createContext, useContext } from 'react'

export interface UserContextValues {
  currentUser: ApiUser | null
}

const UserContext = createContext<UserContextValues | null>(null)

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider')
  }
  return context
}

export default UserContext
