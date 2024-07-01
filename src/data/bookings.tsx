import { BookingRecord } from './BookingRecord'

export const Bookings: BookingRecord[] = [
  {
    tableId: 'ORD_2',
    user: 'Maria Espinosa',
    from: new Date('2024-07-01T08:45:00'),
    to: new Date('2024-07-01T18:40:00'),
  },
  {
    tableId: 'ORD_2',
    user: 'Ivan Funchal',
    from: new Date('2024-07-02T09:15:00'),
    to: new Date('2024-07-02T16:30:00'),
  },
  {
    tableId: 'ORD_3',
    user: 'Ivan Funchal',
    from: new Date('2024-07-02T09:15:00'),
    to: new Date('2024-07-02T16:30:00'),
  },
  {
    tableId: 'Flex_1',
    user: 'Adam Plesnik',
    from: new Date('2024-07-04T08:30:00'),
    to: new Date('2024-07-04T12:30:00'),
  },
  {
    tableId: 'Flex_1',
    user: 'Adam Plesnik',
    from: new Date('2024-07-12T08:30:00'),
    to: new Date('2024-07-12T17:30:00'),
  },
]
