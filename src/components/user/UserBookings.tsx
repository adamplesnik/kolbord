import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { ArrowRight, ListX } from 'lucide-react'
import qs from 'qs'
import { Fragment, useContext } from 'react'
import { DateContext, DateContextType, Value } from '../../providers/DateContextProvider'
import { BookingTypeDeep } from '../../types/bookingType'
import { humanDate, humanTime } from '../../utils/human'
import DateHeading from '../basic/DateHeading'
import DateSelector from '../basic/DateSelector'
import Empty from '../basic/Empty'
import Separator from '../basic/Separator'
import SpaceBookingSlot from '../space/SpaceBookingSlot'

const loadBookingsForUser = async (
  date: Value,
  userId: string | null | undefined,
  getToken: () => Promise<string | null>
): Promise<{ data: { docs: BookingTypeDeep[] } }> => {
  const query = qs.stringify({
    where: {
      and: [
        {
          sub: {
            equals: userId,
          },
          from: {
            greater_than_equal: date,
          },
        },
      ],
    },
    sort: 'from',
  })
  return await axios.get(`${import.meta.env.VITE_API_URL}/bookings?${query}&depth=3`, {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
  })
}

const UserBookings = () => {
  const { userId, getToken } = useAuth()
  const { date } = useContext(DateContext) as DateContextType

  const { data: myBookings } = useQuery({
    queryKey: ['myBookings', date],
    queryFn: () => loadBookingsForUser(date, userId, getToken),
  })

  const bookingDates = [...new Set(myBookings?.data.docs.map((booking) => humanDate(booking.from)))]

  const bookingZones = [
    ...new Set(myBookings?.data.docs.map((booking) => booking.space.value.zone?.value.name)),
  ]

  return (
    <div className="min-h-80 md:min-w-xl">
      <div className="mb-4 flex items-center gap-4 border-b border-black/5 pb-4">
        <h1 className="text-xl font-semibold">Your bookings</h1>
        <DateSelector />
      </div>
      {bookingDates.length < 1 && <Empty Icon={ListX} message="You have no bookings." />}
      {bookingDates &&
        bookingDates?.map((set, i) => (
          <Fragment key={`booking_${i}`}>
            <div
              className="flex flex-col gap-6 text-sm md:flex-row md:items-stretch"
              key={`my_booking_${set}_${i}`}
            >
              <DateHeading date={set} className="w-28 shrink-0 md:py-2" breakDate />
              <Separator vertical />
              <div className="flex max-w-lg flex-1 flex-col gap-2 md:min-w-md">
                {bookingZones?.map((zone) => (
                  <>
                    <span className="pt-2 text-xs text-zinc-500">{zone}</span>
                    {myBookings?.data.docs.map(
                      (booking, i) =>
                        set === humanDate(booking.from) &&
                        zone === booking.space.value.zone?.value.name && (
                          <Fragment key={`user_booking${i}`}>
                            <div className="flex items-center gap-2">
                              <span className="flex flex-[2] items-center gap-4 font-medium">
                                {booking.space?.value.name}
                                {booking.space.value.group && (
                                  <span className="text-xs font-normal text-zinc-400">
                                    {booking.space.value.group.value.name}
                                  </span>
                                )}
                              </span>
                              <SpaceBookingSlot
                                isBooked={booking}
                                spaceId={booking.space.value.id}
                                from={new Date(booking.from)}
                                to={new Date(booking.to)}
                              >
                                {humanTime(booking.from)}
                                <ArrowRight
                                  className="size-4 text-zinc-400 group-hover:text-zinc-200"
                                  strokeWidth={1}
                                />
                                {humanTime(booking.to)}
                              </SpaceBookingSlot>
                            </div>
                          </Fragment>
                        )
                    )}
                    <div className="h-1"></div>
                    <Separator />
                  </>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
    </div>
  )
}

export default UserBookings
