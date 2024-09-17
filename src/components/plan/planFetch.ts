import { useQuery } from '@tanstack/react-query'
import { getOldToken } from '../../auth/helpers'
import { PlanRecord } from '../../data/PlanRecord'

type PlanQueryType = {
  data: PlanRecord
}

const loadPlan = async (id: number): Promise<PlanQueryType> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/plans/${id}?populate[company][fields][0]=uuid&fields[0]=name&fields[1]=svg`,
    {
      headers: {
        Authorization: `Bearer ${getOldToken()}`,
      },
    }
  )
  return response.json()
}

export const usePlanQuery = (id: number) =>
  useQuery({
    queryKey: ['plan', id],
    enabled: id > 0,
    queryFn: () => loadPlan(id),
  })

type NewPlanType = {
  data: PlanRecord
}

export const addPlan = async (apiCompanyId: number): Promise<NewPlanType | undefined> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/plans`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${getOldToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: { name: 'New plan', svg: '<svg></svg>', company: apiCompanyId },
    }),
  })
  if (response.ok) {
    return response.json()
  }
}

type PlansQueryType = {
  data: PlanRecord[]
}

const loadPlans = async (apiCompanyId: number): Promise<PlansQueryType> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/plans?fields[0]=id&fields[1]=name&filters[company][id][$eq]=${apiCompanyId}`,
    {
      headers: {
        Authorization: `Bearer ${getOldToken()}`,
      },
    }
  )
  return response.json()
}

export const usePlansQuery = (companyId: number) =>
  useQuery({
    queryKey: ['plans'],
    queryFn: () => loadPlans(companyId),
  })
