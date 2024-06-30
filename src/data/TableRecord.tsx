export type TableRecord = {
  name: string | number
  rotation: 0 | 90 | 180 | 270
  x: number
  y: number
  group?: string | number | undefined
  available?: boolean | undefined
  booked?: boolean | undefined
  features?: string[]
}
