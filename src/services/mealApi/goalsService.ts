import apiService from './apiService'
import { Goal } from '@/models'
import { Undefined } from '@/types'

export const getGoals = async (userId?: string): Promise<Goal | null> => {
  try {
    const response = await apiService.get(`/goals/get?userId=${userId}`)
    return response.data as Goal
  } catch (error) {
    console.error('Error getting goals:', error)
    return null
  }
}

export const createGoal = async (data: Undefined<Goal>, userId?: string): Promise<void> => {
  try {
    await apiService.post(`/goals/create?userId=${userId}`, data)
  } catch (error) {
    console.error('Error creating goal:', error)
  }
}

export const updateGoal = async (
  data: {
    checkpoint: { date: string; weight: number }[] | undefined
  },
  userId?: string | undefined,
): Promise<void> => {
  try {
    await apiService.put(`/goals/update?userId=${userId}`, data)
  } catch (error) {
    console.error('Error updating goal:', error)
  }
}

export const deleteGoal = async (userId?: string): Promise<void> => {
  try {
    await apiService.delete(`/goals/delete?userId=${userId}`)
  } catch (error) {
    console.error('Error deleting goal:', error)
  }
}
