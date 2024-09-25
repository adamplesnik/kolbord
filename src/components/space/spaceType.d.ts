import dynamicIconImports from 'lucide-react/dynamicIconImports'

export type FeatureType = {
  id: number
  name: string
  description?: string
  lucideIcon?: keyof typeof dynamicIconImports
}

export type RelationshipType = {
  relationTo?: string | undefined
  value?: {
    id: number
    name: string
    description?: string
    lucideIcon?: keyof typeof dynamicIconImports
  }
}

export type SpaceType = {
  id: number
  name: string
  x: number
  y: number
  zone?: {
    relationTo: string
    value: number
  }
  group?: RelationshipType
  features?: RelationshipType[]
  slots: string
  active?: boolean | undefined
  org?: string | null | undefined
}
