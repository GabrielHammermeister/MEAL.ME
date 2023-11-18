import { axiosAPI } from '@/services/spoonacular/spoonacularApi'

export function getIngredients(ingredient: string) {
  return axiosAPI.get('/search', {
    params: {
      query: ingredient,
      number: 6,
    },
  })
}

export function getInformationById(id: string | undefined) {
  return axiosAPI.get(`/${id}/information`, {
    params: {
      amount: 100,
      unit: 'grams',
    },
  })
}
export function getInformationByIdWithAmount(id: string | undefined, amount: number) {
  return axiosAPI.get(`/${id}/information`, {
    params: {
      amount,
      unit: 'grams',
    },
  })
}
