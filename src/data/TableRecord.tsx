export type TableRecord = {
  id: number
  name: string
  x: number
  y: number
  zone?: {
    value: number
  }
  group: {
    value: number
  }
  features: [number]
  slots: string
  active?: boolean | undefined
}
