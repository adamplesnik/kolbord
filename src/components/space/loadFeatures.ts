import { useQuery } from '@tanstack/react-query'
import { getOldToken } from '../../auth/helpers'
import { FeatureRecord } from '../../data/FeatureRecord'

type FeatureRecordQueryType = {
  data: FeatureRecord[]
}

const loadFeatures = async (): Promise<FeatureRecordQueryType> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/features?sort[0]=description`, {
    headers: {
      Authorization: `Bearer ${getOldToken()}`,
    },
  })
  return response.json()
}

export const useFeaturesQuery = () =>
  useQuery({
    queryKey: ['features'],
    queryFn: () => loadFeatures(),
  })
