import { User } from '@/models'
import { createContext, Dispatch, SetStateAction, useContext } from 'react'

export interface UserContextValues {
  currentUser: User | null
  setCurrentUser: Dispatch<SetStateAction<User | null>>
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
