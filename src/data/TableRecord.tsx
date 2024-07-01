export type TableRecord = {
  name: string | number
  rotation: 0 | 90 | 180 | 270
  x: number
  y: number
  group?: string | number | undefined
  features?: number[] | undefined
  available?: boolean | undefined
}
