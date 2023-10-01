export interface User {
  activityLevel: string
  basalMetabolicRate: string
  birthDate: string
  goals: {
    [key: string]: string
  }
  height: number
  meals: {
    [key: string]: string
  }
  name: string
  sex: string
  weight: number
}
