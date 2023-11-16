import apiService from './apiService'
import { ApiUser } from '@/models'
import { Nullable } from '@/types'

export const getUsers = async (userAuth: string): Promise<ApiUser | null> => {
  try {
    const response = await apiService.get(`/users/get?userAuth=${userAuth}`)
    return response.data
  } catch (error) {
    console.error('Error getting users:', error)
    return null
  }
}

export const createUsers = async (data: Nullable<ApiUser>, userAuth: string): Promise<void> => {
  console.log('ENTROU AQUI')
  try {
    await apiService.post(`/users/create?userAuth=${userAuth}`, data)
  } catch (error) {
    console.error('Error creating users:', error)
  }
}

export const updateUsers = async (userAuth: string, data: ApiUser): Promise<void> => {
  try {
    await apiService.put(`/users/update?userAuth=${userAuth}`, data)
  } catch (error) {
    console.error('Error updating users:', error)
  }
}

export const deleteUsers = async (userAuth: string): Promise<void> => {
  try {
    await apiService.delete(`/users/delete?userAuth=${userAuth}`)
  } catch (error) {
    console.error('Error deleting users:', error)
  }
}
