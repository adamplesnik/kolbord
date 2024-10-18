import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import qs from 'qs'
import { useContext, useState } from 'react'
import { SidebarContext, SidebarContextType } from '../../providers/SidebarContextProvider.tsx'
import { ZoneContext, ZoneContextType } from '../../providers/ZoneContextProvider.tsx'
import { BookingType } from '../../types/bookingType'
import { humanTime } from '../../utils/human.ts'
import Button from '../atoms/Button.tsx'
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

  let firstActiveIndex = -1
  let lastActiveIndex = -1

  const timeSlots = (date: Date, hoursFrom: number | undefined, hoursTo: number | undefined) => {
    if (hoursFrom && hoursTo) {
      return generateTimeSlots(date, hoursFrom, hoursTo)
    } else return []
  }

  timeSlots(date, zone?.hoursFrom, zone?.hoursTo).map((d, i) => {
    const isActive = markActive(booking.from, booking.to, d)
    if (isActive && firstActiveIndex === -1) {
      firstActiveIndex = i
    }

    if (isActive) {
      lastActiveIndex = i
    }
  })

  return (
    <div className="flex flex-col gap-3">
      <DateHeading date={date} />
      <div className={clsx('flex items-center gap-1', booking.from ? '' : 'bg-zinc-100')}>
        {booking.from ?
          booking.from.toLocaleString([], { hour: '2-digit', minute: '2-digit' })
        : 'nn'}
        <ArrowRight className="size-4 text-zinc-600" />
        {booking.to?.toLocaleString([], { hour: '2-digit', minute: '2-digit' })}
        <Button>confirm</Button>
      </div>
      <div className="grid grid-cols-4 bg-gradient-to-bl from-cyan-200 to-fuchsia-300">
        <AnimatePresence>
          {zone?.hoursFrom &&
            zone?.hoursTo &&
            generateTimeSlots(date, zone?.hoursFrom, zone?.hoursTo).map((d, i) => {
              const isActive = markActive(booking.from, booking.to, d)

              console.log(Math.floor(firstActiveIndex / 4))
              return (
                <div
                  className={clsx(
                    'relative h-8 overflow-hidden',
                    firstActiveIndex - 1 === i && 'rounded-br-lg'
                  )}
                  key={`slot_${d.getTime()}`}
                >
                  {isActive && firstActiveIndex === i && (
                    <div className="absolute top-0 left-0 size-4 rounded-tl-full bg-red-500/50 shadow-[-10px_-15px_0_10px_#fff]"></div>
                  )}
                  {isActive && firstActiveIndex === i && lastActiveIndex < i + 4 && (
                    <div className="absolute bottom-0 left-0 size-4 rounded-bl-full bg-transparent shadow-[-10px_15px_0_10px_#fff]"></div>
                  )}
                  {isActive && lastActiveIndex === i && (
                    <div className="absolute right-0 bottom-0 size-4 rounded-br-full bg-transparent shadow-[10px_15px_0_10px_#fff]"></div>
                  )}
                  {isActive ?
                    <motion.div
                      initial={false}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: '100%', opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      key={`slot_${d.getTime()}1`}
                      className={clsx('p-1 text-xs inset-shadow-slate-500')}
                      onClick={() => setCurrentBookingTime(d)}
                    >
                      i: {i}, f: {firstActiveIndex},{humanTime(d)}
                    </motion.div>
                  : <motion.div
                      initial={false}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: '-10px', opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      key={`slot_${d.getTime()}2`}
                      className={clsx('bg-white p-1')}
                      onClick={() => setCurrentBookingTime(d)}
                    >
                      {humanTime(d)}
                    </motion.div>
                  }
                </div>
              )
            })}
        </AnimatePresence>
      </div>
    </div>
  )
}

type SpaceBookingDayProps = {
  date: Date
}

export default SpaceBookingDay
