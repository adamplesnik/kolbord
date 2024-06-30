export type BookingRecord = {
  tableId: string
  user: string
  available?: boolean
  from?: Date | undefined
  to?: Date | undefined
}
