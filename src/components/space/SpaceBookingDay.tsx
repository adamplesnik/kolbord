import { useQuery } from '@tanstack/react-query'
import { getToken } from '../../auth/helpers'
import { BookingQueryType } from '../../data/BookingRecord'
import { humanDate, humanDayName } from '../../utils/human.ts'
import Heading from '../basic/Heading'
import { getSlots } from './generateSlots'
import SpaceBookingSlot from './SpaceBookingSlot.tsx'

const SpaceBookingDay = ({ date, slots, tableId }: SpaceBookingDayProps) => {
  let midnight = new Date()
  midnight.setHours(23, 59, 59, 999)
  midnight.setDate(date.getDate())

  const loadBookingsForTable = async (id: number): Promise<BookingQueryType> => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/bookings?populate[users_permissions_user][fields][0]=email&populate[users_permissions_user][fields][1]=firstName&populate[users_permissions_user][fields][2]=lastName&fields[0]=from&fields[1]=to&filters[$and][0][table][id]=${id}&filters[$and][1][from][$gte]=${date.toISOString()}&filters[$and][2][to][$lte]=${midnight.toISOString()}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    return response.json()
  }

  const { data: loadedTableBooking } = useQuery({
    enabled: tableId > 0,
    queryKey: ['tableBooking', tableId, date],
    queryFn: () => loadBookingsForTable(tableId),
  })

  return (
    <div className="flex flex-col gap-3">
      <Heading size={4}>
        <span className="font-semibold text-slate-900">{humanDayName(date)}</span>
        <span className="flex-1 ps-1 text-sm text-slate-600">{humanDate(date)}</span>
      </Heading>
      <div className="flex flex-wrap gap-1">
        {getSlots(date, slots).map((slot, i) => {
          const { from, to } = slot.slot

          const isBooked = loadedTableBooking?.data.find(
            (booking) =>
              new Date(booking.attributes.from) <= from && new Date(booking.attributes.to) >= to
          )

          return (
            <SpaceBookingSlot
              from={from}
              isBooked={isBooked}
              key={`${from.toISOString}_${to.toISOString}_${i}`}
              tableId={tableId}
              to={to}
            />
          )
        })}
      </div>
    </div>
  )
}

type SpaceBookingDayProps = {
  date: Date
  slots: 'whole day' | 'half-day' | 'hours 2' | 'hour 1' | 'minutes 30' | string
  tableId: number
}

export default SpaceBookingDay
