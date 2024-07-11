import { HTMLAttributes, JSXElementConstructor, Key, ReactElement, ReactNode } from 'react'
import { FeatureRecord } from '../../data/FeatureRecord'
import { addWithSpace } from '../../utils/addWithSpace'
import Badge from '../Badge'
import FurnitureFeatureIcon from './FurnitureFeatureIcon'

export const FurnitureFeatures = ({
  features,
  className,
  withDesc = false,
}: FurnitureFeaturesProps) => {
  return (
    <div
      className={
        withDesc
          ? 'flex flex-col gap-4'
          : 'flex flex-wrap items-center justify-center gap-1' + addWithSpace(className)
      }
    >
      {features.data.map(
        (f: {
          id: Key | null | undefined
          attributes: {
            lucideIcon: string
            description:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | null
              | undefined
          }
        }) => (
          <span key={f.id} className={withDesc ? 'flex items-center gap-2' : ''}>
            <Badge className="size-6">
              <FurnitureFeatureIcon
                name={f.attributes.lucideIcon}
                aria-label={f.attributes.description}
                className="size-full"
                strokeWidth={1.5}
              />
            </Badge>
            {withDesc && <span className="text-sm">{f.attributes.description}</span>}
          </span>
        )
      )}
    </div>
  )
}

export type FurnitureFeaturesProps = {
  features: FeatureRecord[]
  withDesc?: boolean
} & HTMLAttributes<HTMLDivElement>
