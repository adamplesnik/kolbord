export type BookingQueryType = {
  data: {
    docs: BookingRecord[]
  }
}

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
