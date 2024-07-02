export type TableRecord = {
  name: string | number
  rotation: number
  x: number
  y: number
  group?: string | number | undefined
  features?: number[] | undefined
  available?: boolean | undefined
}
