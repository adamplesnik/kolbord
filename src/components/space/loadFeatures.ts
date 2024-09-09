import { useQuery } from '@tanstack/react-query'
import { getToken } from '../../auth/helpers'
import { FeatureRecord } from '../../data/FeatureRecord'

type FeatureRecordQueryType = {
  data: FeatureRecord[]
}

const loadFeatures = async (): Promise<FeatureRecordQueryType> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/features`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
  return response.json()
}

export const useFeaturesQuery = () =>
  useQuery({
    queryKey: ['features'],
    queryFn: () => loadFeatures(),
  })
