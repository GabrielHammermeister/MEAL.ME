export * from './Meal'
export * from './User'
export * from './Goal'

export interface GetRequest {
  method: 'GET'
  url: string
}

export interface PostRequest<T> {
  method: 'POST'
  url: string
  body: T
}

export interface PutRequest<T> {
  method: 'PUT'
  url: string
  body: T
}

export interface DeleteRequest {
  method: 'DELETE'
  url: string
}
