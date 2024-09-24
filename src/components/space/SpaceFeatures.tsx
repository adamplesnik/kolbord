import { Fragment, HTMLAttributes } from 'react'
import { Tooltip } from 'react-tooltip'
import { addWithSpace } from '../../utils/addWithSpace.ts'
import Badge from '../basic/Badge'
import SpaceFeatureIcon from './SpaceFeatureIcon.tsx'
import { RelationshipType } from './spaceType'

export const SpaceFeatures = ({
  features,
  badgeClassName,
  noTooltip = false,
}: SpaceFeaturesProps) => {
  console.log(features)
  return (
    <>
      {features.map((feature) => (
        <Fragment key={feature.value.id}>
          <div data-tooltip-id={`feature${feature.value.id}`}>
            <Badge className={'w-8 *:stroke-1.5' + addWithSpace(badgeClassName)}>
              {feature.value.lucideIcon && <SpaceFeatureIcon name={feature.value.lucideIcon} />}
            </Badge>
          </div>
          {!noTooltip && (
            <Tooltip id={`feature${feature.value.id}`} className="z-30">
              <span className="text-sm">{feature.value.name}</span>
            </Tooltip>
          )}
        </Fragment>
      ))}
    </>
  )
}

export type SpaceFeaturesProps = {
  features: RelationshipType[]
  badgeClassName?: string | undefined
  noTooltip?: boolean | undefined
} & HTMLAttributes<HTMLDivElement>
