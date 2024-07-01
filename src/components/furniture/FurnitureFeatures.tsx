import { HTMLAttributes } from 'react'
import { Features } from '../../data/features'

export const FurnitureFeatures = ({ features }: FurnitureFeaturesProps) => {
  const featureList = Features.filter((f) => features.includes(f.id))

  return (
    <div className="flex gap-0.5">
      {featureList.map((f, i) => (
        <f.Icon size={18} key={i} aria-label={f.desc} className="text-zinc-500" strokeWidth={1} />
      ))}
    </div>
  )
}

export type FurnitureFeaturesProps = {
  features: number[]
} & HTMLAttributes<HTMLDivElement>
