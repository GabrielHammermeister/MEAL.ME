import { UserContextValues } from '@/context/user/UserContext'
import { ApiUser } from '@/models'

export type userReducerActions = { type: 'SET_USER'; payload: ApiUser | null }

const userReducer = (state: UserContextValues, action: userReducerActions): UserContextValues => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, currentUser: action.payload }
    default:
      return state
  }
}

export default userReducer
