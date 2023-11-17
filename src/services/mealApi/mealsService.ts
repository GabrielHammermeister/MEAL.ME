// services/MealsService.ts
import apiService from './apiService'
import { Nullable } from '@/types'
import { Meal } from '@/services/mealApi/models/Meal'

export const getMeals = async (userId: string): Promise<Meal | null> => {
  try {
    const response = await apiService.get(`/meals/get?userId=${userId}`)
    return response.data as Meal
  } catch (error) {
    console.error('Error getting meals:', error)
    return null
  }
}
export const createMeals = async (data: Nullable<Meal>, userId: string): Promise<void> => {
  try {
    await apiService.post(`/meals/create?userId=${userId}`, data)
  } catch (error) {
    console.error('Error creating meals:', error)
  }
}
export const updateMeals = async (userId: string, data: Meal): Promise<void> => {
  try {
    await apiService.put(`/meals/update?userId=${userId}`, data)
  } catch (error) {
    console.error('Error updating meals:', error)
  }
}
export const deleteMeals = async (userId: string): Promise<void> => {
  try {
    await apiService.delete(`/meals/delete?userId=${userId}`)
  } catch (error) {
    console.error('Error deleting meals:', error)
  }
}
