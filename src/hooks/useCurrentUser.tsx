import { UserContext, UserContextValues } from '@/context/User.provider'
import { useContext } from 'react'

const useCurrentUser = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext) as UserContextValues
  return {
    currentUser,
    setCurrentUser,
  }
}

export default useCurrentUser
