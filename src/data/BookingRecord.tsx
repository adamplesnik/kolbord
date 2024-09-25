export type BookingRecord = {
  id: number
  from: Date
  to: Date
  space: {
    value: number
  }
  sub?: string | null | undefined
  org?: string | null | undefined
}

export type BookingRecordDeep = {
  id: number
  from: Date
  to: Date
  space: {
    value: {
      id: number
      name: string
      x: number
      y: number
      slots: string
      zone?: {
        value: {
          name: string
        }
      }
      group?: {
        value: {
          name: string
        }
      }
    }
  }
  sub?: string | null | undefined
  org?: string | null | undefined
}
