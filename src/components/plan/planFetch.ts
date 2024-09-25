import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { getOldToken } from '../../auth/helpers'
import { PlanType } from './planType'

export type PlanQueryType = {
  data: PlanType
}

const loadPlan = async (id: number): Promise<PlanQueryType | undefined> => {
  const { getToken } = useAuth()
  try {
    return axios(`${import.meta.env.VITE_API_PAYLOAD_URL}zones/${id}`, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error(error)
  }
}

export const usePlanQuery = (id: number) =>
  useQuery({
    queryKey: ['zone', id],
    enabled: id > 0,
    queryFn: () => loadPlan(id),
  })

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
