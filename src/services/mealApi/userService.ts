import apiService from './apiService'
import { ApiUser } from '@/models'
import { Nullable } from '@/types'

export const getUsers = async (documentId: string): Promise<ApiUser | null> => {
  try {
    const response = await apiService.get(`/users/get?documentId=${documentId}`)
    return response.data
  } catch (error) {
    console.error('Error getting users:', error)
    return null
  }
}

export const createUsers = async (data: Nullable<ApiUser>, documentId: string): Promise<void> => {
  try {
    await apiService.post(`/users/create?userAuth=${documentId}`, data)
  } catch (error) {
    console.error('Error creating users:', error)
  }
}

export const updateUsers = async (documentId: string, data: ApiUser): Promise<void> => {
  try {
    await apiService.put(`/users/update?documentId=${documentId}`, data)
  } catch (error) {
    console.error('Error updating users:', error)
  }
}

export const deleteUsers = async (documentId: string): Promise<void> => {
  try {
    await apiService.delete(`/users/delete?documentId=${documentId}`)
  } catch (error) {
    console.error('Error deleting users:', error)
  }
}
