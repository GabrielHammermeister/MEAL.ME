import {
  DeleteRequest,
  GetRequest,
  Meal,
  PostRequest,
  PutRequest,
} from '@/services/mealme-api/models'

export class MealsService {
  static getMeals(documentId: string): GetRequest {
    return {
      method: 'GET',
      url: `http://ec2-3-92-24-8.compute-1.amazonaws.com/meals/get?documentId=${documentId}`,
    }
  }

  static createMeals(meal: Meal): PostRequest<Meal> {
    return {
      method: 'POST',
      url: 'http://ec2-3-92-24-8.compute-1.amazonaws.com/meals/create',
      body: meal,
    }
  }

  static updateMeals(documentId: string, meal: Meal): PutRequest<Meal> {
    return {
      method: 'PUT',
      url: `http://ec2-3-92-24-8.compute-1.amazonaws.com/meals/update?documentId=${documentId}`,
      body: meal,
    }
  }

  static deleteMeals(documentId: string): DeleteRequest {
    return {
      method: 'DELETE',
      url: `http://ec2-3-92-24-8.compute-1.amazonaws.com/meals/delete?documentId=${documentId}`,
    }
  }
}
