export type BookingQueryType = {
  data: {
    docs: BookingRecord[]
  }
}

export type BookingRecord = {
  id: number
  from: string
  to: string
  space: {
    value: number
  }
  sub: string
  org: string
}
