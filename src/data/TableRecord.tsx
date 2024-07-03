export type TableRecord = {
  name: string | number
  rotation: number
  x: number
  y: number
  group?: string | number | undefined
  features?: string | undefined
  available?: boolean | undefined
  active?: boolean | undefined
}
