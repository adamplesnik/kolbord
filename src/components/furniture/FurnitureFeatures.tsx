import { useQuery } from '@tanstack/react-query'
import { HTMLAttributes } from 'react'
import { FeatureRecord } from '../../data/FeatureRecord'
import { addWithSpace } from '../../utils/addWithSpace'
import Badge from '../Badge'
import FurnitureFeatureIcon from './FurnitureFeatureIcon'

export const FurnitureFeatures = ({
  features,
  className,
  withDesc = false,
}: FurnitureFeaturesProps) => {
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
          <Badge className="size-6 *:stroke-1">
            {data?.data.map(
              (d) =>
                d.id === f.id && <FurnitureFeatureIcon key={d.id} name={d.attributes.lucideIcon} />
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

export type FurnitureFeaturesProps = {
  features: FeatureRecord[]
  withDesc?: boolean
} & HTMLAttributes<HTMLDivElement>
