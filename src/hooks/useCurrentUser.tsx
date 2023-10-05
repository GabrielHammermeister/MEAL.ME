import { UserContext, UserContextValues } from '@/context/User.provider'
import { useContext } from 'react'

const useCurrentUser = () => {
  const { currentUser } = useContext(UserContext) as UserContextValues
  return {
    currentUser,
  }
}

export default useCurrentUser
