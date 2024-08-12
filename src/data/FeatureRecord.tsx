import dynamicIconImports from 'lucide-react/dynamicIconImports'

export type FeatureRecord = {
  id: number
  attributes: {
    description: string
    lucideIcon: keyof typeof dynamicIconImports
  }
}
