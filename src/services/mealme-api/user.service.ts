import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PutRequest,
  User,
} from '@/services/mealme-api/models'
import { AxiosResponse } from 'axios'
import axiosInstance from '@/services/mealme-api/index'

export class UsersService {
  static getUsers(documentId: string): Promise<AxiosResponse<User>> {
    // return {
    //   method: 'GET',
    //   url: `http://ec2-3-92-24-8.compute-1.amazonaws.com/users/get?documentId=${documentId}`,
    // }
    const url = `/users/get?documentId=${documentId}`
    return axiosInstance.get(url)
  }

  static createUsers(user: User, userAuth: string): PostRequest<User> {
    return {
      method: 'POST',
      url: `http://ec2-3-92-24-8.compute-1.amazonaws.com/users/create?userAuth=${userAuth}`,
      body: user,
    }
  }

  static updateUsers(userAuth: string, user: User): PutRequest<User> {
    return {
      method: 'PUT',
      url: `http://ec2-3-92-24-8.compute-1.amazonaws.com/users/update?userAuth=${userAuth}`,
      body: user,
    }
  }

  static deleteUsers(documentId: string): DeleteRequest {
    return {
      method: 'DELETE',
      url: `http://ec2-3-92-24-8.compute-1.amazonaws.com/users/delete?documentId=${documentId}`,
    }
  }
}
