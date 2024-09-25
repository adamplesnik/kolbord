export type GroupRecord = {
  id: number
  name: string
  description: string
  x: number
  y: number
  zone: {
    relationTo: string
    value: number
  }
  showMarker: boolean
  org: string
}
