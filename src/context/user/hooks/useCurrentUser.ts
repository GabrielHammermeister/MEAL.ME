import { useContext } from 'react'
import UserContext from '../UserContext'

export const useCurrentUser = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext) || {
    currentUser: null,
    setCurrentUser: () => {},
  }

  return { currentUser, setCurrentUser }
}
