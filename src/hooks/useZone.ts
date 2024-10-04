import { useQuery } from '@tanstack/react-query'
import { ZoneType } from '../types/zoneType'

export const useZone = () => {
  const { data, isLoading, error } = useQuery<{ data: ZoneType }>({
    queryKey: ['zone'],
    enabled: true,
  })

  const zoneId = data?.data.id

  return {
    zone: data,
    zoneId,
    isLoading,
    error,
  }
}
