import { Dispatch } from 'react'
import { userReducerActions } from './UserReducer'
import { ApiUser } from '@/models'

export const setUser = (dispatch: Dispatch<userReducerActions>, user: ApiUser | null) => {
  dispatch({ type: 'SET_USER', payload: user })
}
