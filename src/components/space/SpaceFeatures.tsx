import { Fragment, HTMLAttributes } from 'react'
import { RelationshipType } from '../../types/spaceType'
import { addWithSpace } from '../../utils/addWithSpace.ts'
import Badge from '../basic/Badge'
import CustomTooltip from '../basic/CustomTooltip.tsx'
import SpaceFeatureIcon from './SpaceFeatureIcon.tsx'

export const SpaceFeatures = ({
  features,
  badgeClassName,
  noTooltip = false,
}: SpaceFeaturesProps) => {
  return (
    <>
      {features.map((feature) => (
        <Fragment key={feature.value?.id}>
          <div data-tooltip-id={`feature${feature.value?.id}`}>
            <Badge className={'w-8 *:stroke-1.5' + addWithSpace(badgeClassName)}>
              {feature.value?.lucideIcon && <SpaceFeatureIcon name={feature.value.lucideIcon} />}
            </Badge>
          </div>
          {!noTooltip && (
            <CustomTooltip id={`feature${feature.value?.id}`} className="z-30">
              <span className="text-sm">{feature.value?.name}</span>
            </CustomTooltip>
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
