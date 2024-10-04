import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import qs from 'qs'
import { useContext } from 'react'
import { SidebarContext, SidebarContextType } from '../../providers/SidebarContextProvider.tsx'
import { BookingType } from '../../types/bookingType'
import DateHeading from '../basic/DateHeading.tsx'
import { getSlots } from './generateSlots'
import SpaceBookingSlot from './SpaceBookingSlot.tsx'

const SpaceBookingDay = ({ date }: SpaceBookingDayProps) => {
  const midnight = new Date()
  midnight.setHours(23, 59, 59, 999)
  midnight.setDate(date.getDate())
  const { sidebarState } = useContext(SidebarContext) as SidebarContextType
  const spaceId = sidebarState.space?.id
  const slots = sidebarState.space?.slots

  const { getToken } = useAuth()
  const loadBookingsForSpace = async (
    spaceId: number | undefined
  ): Promise<{ data: { docs: BookingType[] } }> => {
    const query = qs.stringify({
      where: {
        and: [
          {
            'space.value': {
              equals: spaceId,
            },
            from: {
              greater_than_equal: date,
            },
            to: {
              less_than_equal: midnight,
            },
          },
        ],
      },
    })
    return axios.get(`${import.meta.env.VITE_API_URL}/bookings?${query}`, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    })
  }

  const { data: loadedSpaceBooking } = useQuery({
    enabled: spaceId != undefined && spaceId > 0,
    queryKey: ['tableBooking', spaceId, date],
    queryFn: () => loadBookingsForSpace(spaceId),
  })

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
}

export default SpaceBookingDay
