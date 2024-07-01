import { HTMLAttributes } from 'react'
import { Features } from '../../data/features'
import { addWithSpace } from '../../utils/addWithSpace'

export const FurnitureFeatures = ({ features, className }: FurnitureFeaturesProps) => {
  const featureList = Features.filter((f) => features.includes(f.id))

  return (
    <div className={'flex flex-wrap items-center justify-center gap-1' + addWithSpace(className)}>
      {featureList.map((f, i) => (
        <f.Icon
          key={i}
          aria-label={f.desc}
          className="rounded border border-slate-400 p-1 text-slate-500"
          strokeWidth={1.5}
        />
      ))}
    </div>
  )
}

export type FurnitureFeaturesProps = {
  features: number[]
} & HTMLAttributes<HTMLDivElement>
