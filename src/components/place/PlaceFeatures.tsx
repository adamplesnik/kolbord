import { HTMLAttributes } from 'react'
import { FeatureRecord } from '../../data/FeatureRecord'
import { addWithSpace } from '../../utils/addWithSpace'
import Badge from '../Badge'
import PlaceFeatureIcon from './PlaceFeatureIcon'

export const PlaceFeatures = ({ features, className, withDesc = false }: PlaceFeaturesProps) => {
  return (
    <div
      className={
        withDesc
          ? 'flex flex-col gap-2'
          : 'flex flex-wrap items-center justify-center gap-1' + addWithSpace(className)
      }
    >
      {features?.map((feature) => (
        <div key={feature.id} className={withDesc ? 'flex items-center gap-2' : ''}>
          <Badge className="size-8 *:stroke-1.5">
            <PlaceFeatureIcon name={feature.attributes.lucideIcon} />
          </Badge>
          {withDesc && <span className="text-sm">{feature.attributes.description}</span>}
        </div>
      ))}
    </div>
  )
}

export type PlaceFeaturesProps = {
  features: FeatureRecord[]
  withDesc?: boolean
} & HTMLAttributes<HTMLDivElement>
