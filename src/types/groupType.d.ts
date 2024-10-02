export type GroupType = {
  id: number
  name: string
  description: string
  x: number
  y: number
  zone:
    | {
        relationTo: string
        value: number
      }
    | undefined
  showMarker: boolean
  org: string | undefined
}
