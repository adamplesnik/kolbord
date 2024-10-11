import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import qs from 'qs'
import { useContext, useState } from 'react'
import { SidebarContext, SidebarContextType } from '../../providers/SidebarContextProvider.tsx'
import { ZoneContext, ZoneContextType } from '../../providers/ZoneContextProvider.tsx'
import { BookingType } from '../../types/bookingType'
import { humanTime } from '../../utils/human.ts'
import DateHeading from '../basic/DateHeading.tsx'
import { generateTimeSlots } from './generateSlots'

const loadBookingsForSpace = async (
  spaceId: number | undefined,
  getToken: () => Promise<string | null>,
  date: Date
): Promise<{ data: { docs: BookingType[] } }> => {
  const midnight = new Date()
  midnight.setHours(23, 59, 59, 999)
  midnight.setDate(date.getDate())

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

const compareDates = (from: Date | undefined, to: Date | undefined) => {
  return from?.getTime() === to?.getTime()
}

const SpaceBookingDay = ({ date }: SpaceBookingDayProps) => {
  const { getToken } = useAuth()
  const { sidebarState } = useContext(SidebarContext) as SidebarContextType
  const { zone } = useContext(ZoneContext) as ZoneContextType

  const [bookingFrom, setBookingFrom] = useState<Date | undefined>(undefined)
  const [bookingTo, setBookingTo] = useState<Date | undefined>(undefined)

  const spaceId = sidebarState.space?.id

  const setCurrentBookingTime = (date: Date) => {
    if (!bookingFrom && !bookingTo) {
      setBookingFrom(date)
    } else if (compareDates(bookingFrom, date)) {
      setBookingFrom(undefined)
      setBookingTo(undefined)
    } else if (bookingFrom && !bookingTo && date > bookingFrom) {
      setBookingTo(date)
    } else if (compareDates(bookingTo, date)) {
      setBookingTo(undefined)
    } else if (bookingFrom && date < bookingFrom) {
      setBookingFrom(date)
    } else {
      setBookingTo(date)
    }
  }

  const { data: loadedSpaceBooking } = useQuery({
    enabled: spaceId != undefined && spaceId > 0,
    queryKey: ['tableBooking', spaceId, date],
    queryFn: () => loadBookingsForSpace(spaceId, getToken, date),
  })

  console.log(loadedSpaceBooking)

  return (
    <div className="flex flex-col gap-3">
      <DateHeading date={date} />
      {bookingFrom?.toLocaleTimeString()}, {bookingTo?.toLocaleTimeString()}
      <div className="grid grid-cols-4 gap-1">
        {zone?.hoursFrom &&
          zone?.hoursTo &&
          generateTimeSlots(date, zone?.hoursFrom, zone?.hoursTo).map((d) => (
            <span
              className="cursor-pointer rounded bg-teal-50 p-0.5 text-center hover:bg-emerald-100"
              onClick={() => setCurrentBookingTime(d)}
            >
              {humanTime(d)}
            </span>
          ))}
      </div>
    </div>
  )
}

type SpaceBookingDayProps = {
  date: Date
}

export default SpaceBookingDay
