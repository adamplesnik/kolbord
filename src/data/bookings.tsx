import { BookingRecord } from './BookingRecord'

export const Bookings: BookingRecord[] = [
  {
    tableId: 'ORD_MMA',
    user: 'MMA',
    available: false,
  },
  {
    tableId: 'ORD_MVA',
    user: 'MVA',
    available: false,
  },
  {
    tableId: 'ORD_2',
    user: 'HHI',
    from: new Date(),
    to: new Date(),
  },
]
