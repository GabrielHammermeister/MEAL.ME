// services/MealsService.ts
import apiService from './apiService'
import { Nullable } from '@/types'
import { Meal } from '@/services/mealApi/models/Meal'

export const getMeals = async (documentId: string): Promise<Meal | null> => {
  try {
    const response = await apiService.get(`/meals/get?documentId=${documentId}`)
    return response.data as Meal
  } catch (error) {
    console.error('Error getting meals:', error)
    return null
  }
}
export const createMeals = async (data: Nullable<Meal>, documentId: string): Promise<void> => {
  try {
    await apiService.post(`/meals/create`, data)
  } catch (error) {
    console.error('Error creating meals:', error)
  }
}
export const updateMeals = async (documentId: string, data: Meal): Promise<void> => {
  try {
    await apiService.put(`/meals/update?documentId=${documentId}`, data)
  } catch (error) {
    console.error('Error updating meals:', error)
  }
}
export const deleteMeals = async (documentId: string): Promise<void> => {
  try {
    await apiService.delete(`/meals/delete?documentId=${documentId}`)
  } catch (error) {
    console.error('Error deleting meals:', error)
  }
}
