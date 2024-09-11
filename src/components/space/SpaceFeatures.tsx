import { Fragment, HTMLAttributes } from 'react'
import { Tooltip } from 'react-tooltip'
import { FeatureRecord } from '../../data/FeatureRecord'
import Badge from '../basic/Badge'
import SpaceFeatureIcon from './SpaceFeatureIcon.tsx'
import { useFeaturesQuery } from './loadFeatures.ts'
import { addWithSpace } from '../../utils/addWithSpace.ts'

export const SpaceFeatures = ({ features, badgeClassName }: SpaceFeaturesProps) => {
  const { data } = useFeaturesQuery()

  const filteredData = data?.data.filter((d) => features.some((f) => d.id === f.id))

  return (
    <>
      {filteredData?.map((feature) => (
        <Fragment key={feature.id}>
          <div data-tooltip-id={`feature${feature.id}`}>
            <Badge className={'w-8 *:stroke-1.5' + addWithSpace(badgeClassName)}>
              {feature.attributes.lucideIcon && (
                <SpaceFeatureIcon name={feature.attributes.lucideIcon} />
              )}
            </Badge>
          </div>
          <Tooltip id={`feature${feature.id}`} className="z-30">
            <span className="text-sm">{feature.attributes.description}</span>
          </Tooltip>
        </Fragment>
      ))}
    </>
  )
}

export type SpaceFeaturesProps = {
  features: FeatureRecord[]
  badgeClassName?: string | undefined
} & HTMLAttributes<HTMLDivElement>
