export type GroupMarkerRecord = {
  id: number
  attributes: {
    x: number
    y: number
    group: {
      data: {
        id: number
        attributes: {
          name: string
        }
      }
    }
  }
}
