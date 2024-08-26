import { LucideProps } from 'lucide-react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import { lazy, Suspense } from 'react'

const fallback = <div style={{ background: '#ddd', width: 12, height: 12 }} />

type IconProps = Omit<LucideProps, 'ref'> & {
  name: keyof typeof dynamicIconImports
}

const PlaceFeatureIcon = ({ name, ...props }: IconProps) => {
  const LucideIcon = lazy(dynamicIconImports[name])

  return (
    <Suspense fallback={fallback}>
      <LucideIcon {...props} className="size-5" />
    </Suspense>
  )
}

export default PlaceFeatureIcon