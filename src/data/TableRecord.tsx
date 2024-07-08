export type TableRecord = {
  id: number
  attributes: {
    name: string | number
    rotation: string
    x: number
    y: number
    group?: string | number | undefined
    features?: string | undefined
    available?: boolean | undefined
    width: number
    height: number
    rounded?: boolean | undefined
  }
  active?: boolean | undefined
}
