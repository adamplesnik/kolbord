import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { BookingQueryType } from '../../data/BookingRecord'
import DateHeading from '../basic/DateHeading.tsx'
import { getSlots } from './generateSlots'
import SpaceBookingSlot from './SpaceBookingSlot.tsx'

const SpaceBookingDay = ({ date, slots, spaceId }: SpaceBookingDayProps) => {
  const midnight = new Date()
  midnight.setHours(23, 59, 59, 999)
  midnight.setDate(date.getDate())

  const { getToken } = useAuth()
  const loadBookingsForSpace = async (spaceId: number): Promise<BookingQueryType> => {
    return axios.get(
      `${import.meta.env.VITE_API_PAYLOAD_URL}/bookings?where[space][id][equals]=${spaceId}`,
      //?filters[$and][0][table][id]=${spaceId}&filters[$and][1][from][$gte]=${date.toISOString()}&filters[$and][2][to][$lte]=${midnight.toISOString()}
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    )
  }

  const { data: loadedSpaceBooking } = useQuery({
    enabled: spaceId > 0,
    queryKey: ['tableBooking', spaceId, date],
    queryFn: () => loadBookingsForSpace(spaceId),
  })

  console.log(loadedSpaceBooking)

  return (
    <div className="flex flex-col gap-3">
      <DateHeading date={date} />
      <div className="flex flex-wrap gap-1">
        {getSlots(date, slots).map((slot, i) => {
          const { from, to } = slot.slot

          const isBooked = loadedSpaceBooking?.data.docs.find(
            (booking) => new Date(booking.from) <= from && new Date(booking.to) >= to
          )

          return (
            <SpaceBookingSlot
              from={from}
              isBooked={isBooked}
              key={`${from.toISOString}_${to.toISOString}_${i}`}
              spaceId={spaceId}
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
  spaceId: number
}

export default SpaceBookingDay
