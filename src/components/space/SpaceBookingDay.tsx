import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import clsx from 'clsx'
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

const addHalfHour = (date: Date) => {
  const newDate = new Date(date.getTime())
  newDate.setMinutes(newDate.getMinutes() + 30)
  return newDate
}

const equalDates = (from: Date | undefined, to: Date | undefined) => {
  return from?.getTime() === to?.getTime()
}

const markActive = (dateFrom: Date | undefined, dateTo: Date | undefined, slotDate: Date) => {
  if (dateFrom && !dateTo) {
    return slotDate.getTime() === dateFrom.getTime()
  } else if (dateFrom && dateTo) {
    return slotDate >= dateFrom && slotDate < dateTo
  } else {
    return false
  }
}

const SpaceBookingDay = ({ date }: SpaceBookingDayProps) => {
  const { getToken } = useAuth()
  const { sidebarState } = useContext(SidebarContext) as SidebarContextType
  const { zone } = useContext(ZoneContext) as ZoneContextType

  const [booking, setBooking] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })

  const spaceId = sidebarState.space?.id

  const setCurrentBookingTime = (date: Date) => {
    const { from, to } = booking

    if ((!from && !to) || (from && date < from)) {
      setBooking({ from: date, to: addHalfHour(date) })
    } else if (equalDates(from, date)) {
      setBooking({ from: undefined, to: undefined })
    } else if (from && !to && date > from) {
      setBooking({ from: from, to: addHalfHour(date) })
    } else if (to && equalDates(addHalfHour(to), date)) {
      setBooking({ from: from, to: undefined })
    } else {
      setBooking({ from: from, to: addHalfHour(date) })
    }
  }

  const { data: loadedSpaceBooking } = useQuery({
    enabled: spaceId != undefined && spaceId > 0,
    queryKey: ['tableBooking', spaceId, date],
    queryFn: () => loadBookingsForSpace(spaceId, getToken, date),
  })

  console.info(loadedSpaceBooking)

  return (
    <div className="flex flex-col gap-3">
      <DateHeading date={date} />
      {booking.from?.toLocaleTimeString()}, {booking.to?.toLocaleTimeString()}
      <div className="grid grid-cols-4 gap-1">
        {zone?.hoursFrom &&
          zone?.hoursTo &&
          generateTimeSlots(date, zone?.hoursFrom, zone?.hoursTo).map((d) => {
            const isActive = markActive(booking.from, booking.to, d)
            return (
              <div
                key={`slot_${d.getTime()}`}
                className={clsx(
                  'peer relative z-10 cursor-pointer gap-0.5 p-0.5 text-center',
                  isActive ?
                    'rounded-l bg-slate-600 text-white hover:bg-slate-500 [.bg-slate-600:nth-last-child(-n+1))]:rounded-r'
                  : 'rounded bg-teal-100 hover:bg-emerald-100',
                  '[+.bg-slate-600]:bg-red-100',
                  isActive &&
                    'after:absolute after:inset-0 after:-right-1 after:-z-10 after:bg-zinc-500 nth-[4]:after:right-0'
                )}
                onClick={() => setCurrentBookingTime(d)}
              >
                {humanTime(d)}
              </div>
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
