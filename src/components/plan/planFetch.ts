import { getOldToken } from '../../auth/helpers'
import { PlanType } from './planType'

export const addPlan = async (): Promise<PlanType | undefined> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/plans`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${getOldToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: { name: 'New plan', svg: '<svg></svg>', company: 0 },
    }),
  })
  if (response.ok) {
    return response.json()
  }
}
