import { useQuery } from '@tanstack/react-query'
import { getToken } from '../../auth/helpers'
import { PlanRecord } from '../../data/PlanRecord'

type PlanQueryType = {
  data: PlanRecord
}

const loadPlan = async (id: number): Promise<PlanQueryType> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/plans/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
  return response.json()
}

export const usePlanQuery = (id: number) =>
  useQuery({
    queryKey: ['plan', id],
    enabled: id > 0,
    queryFn: () => loadPlan(id),
  })
