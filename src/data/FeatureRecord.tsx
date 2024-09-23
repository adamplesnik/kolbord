import dynamicIconImports from 'lucide-react/dynamicIconImports'

export type FeatureRecord = {
  id?: number | undefined
  name: string
  lucideIcon: keyof typeof dynamicIconImports
}
