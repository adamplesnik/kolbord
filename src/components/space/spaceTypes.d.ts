import dynamicIconImports from 'lucide-react/dynamicIconImports'

export type RelationShipType = {
  relationTo?: string | undefined
  value: number
}

export type RelationShipDetailType = {
  relationTo?: string | undefined
  value: {
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
  zone?: RelationShipType
  group: RelationShipType
  features?: RelationShipType[]
  slots: string
  active?: boolean | undefined
}

export type SpaceDetailType = {
  id: number
  name: string
  x: number
  y: number
  zone?: RelationShipType
  group: RelationShipDetailType
  features?: RelationShipDetailType[]
  slots: string
  active?: boolean | undefined
}
