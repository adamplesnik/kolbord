import { useQuery } from '@tanstack/react-query'
import { PlanType } from '../../types/spaceType'

export const useZone = () => {
  const { data, isLoading, error } = useQuery<{ data: PlanType }>({
    queryKey: ['zone'],
    enabled: true,
  })

  // Extract the zoneId from the data
  const zoneId = data?.data?.id

  return {
    zone: data,
    zoneId,
    isLoading,
    error,
  }
}
