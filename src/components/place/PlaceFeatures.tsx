import { useQuery } from '@tanstack/react-query'
import { HTMLAttributes } from 'react'
import { FeatureRecord } from '../../data/FeatureRecord'
import { addWithSpace } from '../../utils/addWithSpace'
import Badge from '../Badge'
import PlaceFeatureIcon from './PlaceFeatureIcon'

export const PlaceFeatures = ({ features, className, withDesc = false }: PlaceFeaturesProps) => {
  type FeatureQueryType = {
    data: FeatureRecord[]
  }

  const loadFeatures = async (): Promise<FeatureQueryType> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/features`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PRIVATE_READ_ONLY_API_ID}`,
      },
    })
    return response.json()
  }

  const { data } = useQuery({
    queryKey: ['features'],
    queryFn: loadFeatures,
  })

  return (
    <div
      className={
        withDesc
          ? 'flex flex-col gap-2'
          : 'flex flex-wrap items-center justify-center gap-1' + addWithSpace(className)
      }
    >
      {features?.map((f) => (
        <div key={f.id} className={withDesc ? 'flex items-center gap-2' : ''}>
          <Badge className="size-8 *:stroke-1.5">
            {data?.data.map(
              (d) => d.id === f.id && <PlaceFeatureIcon key={d.id} name={d.attributes.lucideIcon} />
            )}
          </Badge>
          {withDesc && (
            <span className="text-sm">
              {data?.data.map((d) => d.id === f.id && d.attributes.description)}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

export type PlaceFeaturesProps = {
  features: FeatureRecord[]
  withDesc?: boolean
} & HTMLAttributes<HTMLDivElement>
