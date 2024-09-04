import { Fragment, HTMLAttributes } from 'react'
import { Tooltip } from 'react-tooltip'
import { FeatureRecord } from '../../data/FeatureRecord'
import Badge from '../basic/Badge'
import PlaceFeatureIcon from './PlaceFeatureIcon'

export const PlaceFeatures = ({ features }: PlaceFeaturesProps) => {
  return (
    <>
      {features?.map((feature) => (
        <Fragment key={feature.id}>
          <div data-tooltip-id={`feature${feature.id}`}>
            <Badge className="w-8 *:stroke-1.5">
              <PlaceFeatureIcon name={feature.attributes.lucideIcon} />
            </Badge>
          </div>
          <Tooltip
            id={`feature${feature.id}`}
            className="z-30 text-sm"
            content={feature.attributes.description}
          />
        </Fragment>
      ))}
    </>
  )
}

export type PlaceFeaturesProps = {
  features: FeatureRecord[]
} & HTMLAttributes<HTMLDivElement>
