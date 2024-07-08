import { HTMLAttributes, useEffect, useState } from 'react'
import { FeatureRecord } from '../../data/FeatureRecord'
import { addWithSpace } from '../../utils/addWithSpace'
import Badge from '../Badge'
import FurnitureFeatureIcon from './FurnitureFeatureIcon'

export const FurnitureFeatures = ({
  features,
  className,
  withDesc = false,
}: FurnitureFeaturesProps) => {
  const [allFeatures, setAllFeatures] = useState<FeatureRecord[]>([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/features`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_FEATURES_API_ID}`,
      },
    })
      .then((response) => response.json())
      .then((features) => setAllFeatures(features.data))
  }, [])

  const furnitureFeatures = features && features.split(',')
  const featureList = allFeatures.filter((f) => furnitureFeatures.includes(f.id.toFixed()))

  return (
    <div
      className={
        withDesc
          ? 'flex flex-col gap-4'
          : 'flex flex-wrap items-center justify-center gap-1' + addWithSpace(className)
      }
    >
      {featureList.map((f, i) => (
        <span key={i} className={withDesc ? 'flex items-center gap-2' : ''}>
          <Badge className="size-6">
            <FurnitureFeatureIcon
              name={f.attributes.lucideIcon}
              aria-label={f.attributes.description}
              className="size-full"
              strokeWidth={1.5}
            />
            {/* <f.attributes.lucideIcon aria-label={f.attributes.description} className="size-full" /> */}
          </Badge>
          {withDesc && <span className="text-sm">{f.attributes.description}</span>}
        </span>
      ))}
    </div>
  )
}

export type FurnitureFeaturesProps = {
  features: string
  withDesc?: boolean
} & HTMLAttributes<HTMLDivElement>
