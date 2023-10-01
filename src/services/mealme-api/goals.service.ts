import { Goal } from '@/services/mealme-api/models/Goal'
import { DeleteRequest, GetRequest, PostRequest, PutRequest } from '@/services/mealme-api/models'

class GoalsService {
  static getGoals(documentId: string): GetRequest {
    return {
      method: 'GET',
      url: `http://ec2-3-92-24-8.compute-1.amazonaws.com/goals/get?documentId=${documentId}`,
    }
  }

  static createGoals(goals: Goal): PostRequest<Goal> {
    return {
      method: 'POST',
      url: 'http://ec2-3-92-24-8.compute-1.amazonaws.com/goals/create',
      body: goals,
    }
  }

  static updateGoals(documentId: string, goals: Goal): PutRequest<Goal> {
    return {
      method: 'PUT',
      url: `http://ec2-3-92-24-8.compute-1.amazonaws.com/goals/update?documentId=${documentId}`,
      body: goals,
    }
  }

  static deleteGoals(documentId: string): DeleteRequest {
    return {
      method: 'DELETE',
      url: `http://ec2-3-92-24-8.compute-1.amazonaws.com/goals/delete?documentId=${documentId}`,
    }
  }
}
