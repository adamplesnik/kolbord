import dynamicIconImports from 'lucide-react/dynamicIconImports'

export type TableRecord = {
  id: number
  name: string
  x: number
  y: number
  zone?: {
    value: number
  }
  group: {
    value:
      | number
      | {
          name: string
          description: string
        }
  }
  features: {
    value: {
      id?: number
      lucideIcon: keyof typeof dynamicIconImports
      name: string
    }
  }[]
  slots: string
  active?: boolean | undefined
}
