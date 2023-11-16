export interface Goal {
  type: 'WEIGHT_GAIN' | 'WEIGHT_LOSS'
  dailyCalories: number
  deadline: string
  initialWeight: number
  weightGoal: number
  checkpoint: {
    date: string
    weight: number
  }[]
}
