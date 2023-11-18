export interface Goal {
  type: 'WEIGHT_GAIN' | 'WEIGHT_LOSS' | undefined
  dailyCalories: number
  initialDate: string
  deadline: string
  initialWeight: number
  weightGoal: number
  checkpoint: {
    date: string
    weight: number
  }[]
}
