import { useQuery } from '@tanstack/react-query'
import { PlanType } from './planType'

export const useZone = () => {
  return useQuery<{ data: PlanType }>({
    queryKey: ['zone'],
    enabled: true,
  })
}
