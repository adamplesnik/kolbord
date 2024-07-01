import { HTMLAttributes } from 'react'
import { Features } from '../../data/features'
import { addWithSpace } from '../../utils/addWithSpace'
import Badge from '../Badge'

export const FurnitureFeatures = ({
  features,
  className,
  withDesc = false,
}: FurnitureFeaturesProps) => {
  const featureList = Features.filter((f) => features.includes(f.id))

  return (
    <div
      className={
        withDesc
          ? 'flex flex-col gap-4'
          : 'flex flex-wrap items-center justify-center gap-1' + addWithSpace(className)
      }
    >
      {featureList.map((f, i) => (
        <span className={withDesc ? 'flex gap-2' : ''}>
          <Badge className="size-6">
            <f.Icon key={i} aria-label={f.desc} strokeWidth={1.5} className="size-full" />
          </Badge>
          {withDesc && <span>{f.desc}</span>}
        </span>
      ))}
    </div>
  )
}

export type FurnitureFeaturesProps = {
  features: number[]
  withDesc?: boolean
} & HTMLAttributes<HTMLDivElement>
