export type BookingRecord = {
  id: number
  from: Date
  to: Date
  space: {
    value:
      | number
      | {
          id: number
          name: string
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
