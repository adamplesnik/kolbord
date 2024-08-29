import { HTMLAttributes } from 'react'
import { FeatureRecord } from '../../data/FeatureRecord'
import { addWithSpace } from '../../utils/addWithSpace'
import Badge from '../basic/Badge'
import PlaceFeatureIcon from './PlaceFeatureIcon'
import { Tooltip } from 'react-tooltip'

export const PlaceFeatures = ({ features, className, withDesc = false }: PlaceFeaturesProps) => {
  return (
    <div
      className={
        'flex flex-wrap items-center' +
        addWithSpace(withDesc ? 'gap-2' : 'justify-center gap-1') +
        addWithSpace(className)
      }
    >
      {features?.map((feature) => (
        <div key={feature.id} className="flex items-center gap-2">
          <div data-tooltip-id={`feature${feature.id}`}>
            <Badge className="size-8 *:stroke-1.5">
              <PlaceFeatureIcon name={feature.attributes.lucideIcon} />
            </Badge>
          </div>
          {withDesc && (
            <Tooltip
              id={`feature${feature.id}`}
              className="text-sm"
              content={feature.attributes.description}
            />
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
