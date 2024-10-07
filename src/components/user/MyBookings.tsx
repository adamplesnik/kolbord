import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { ArrowRight, ListX } from 'lucide-react'
import qs from 'qs'
import { useContext } from 'react'
import { Fragment } from 'react/jsx-runtime'
import { DateContext, DateContextType } from '../../providers/DateContextProvider'
import { SidebarContext, SidebarContextType } from '../../providers/SidebarContextProvider'
import { BookingTypeDeep } from '../../types/bookingType'
import { humanDate, humanTime } from '../../utils/human'
import Button from '../basic/Button'
import DateHeading from '../basic/DateHeading'
import Empty from '../basic/Empty'
import Separator from '../basic/Separator'
import SpaceBookingSlot from '../space/SpaceBookingSlot'

const MyBookings = () => {
  const { userId, getToken } = useAuth()
  const { date } = useContext(DateContext) as DateContextType
  const { setSidebarState } = useContext(SidebarContext) as SidebarContextType

  const loadBookingsForUser = async (
    userId: string | null | undefined
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

  const { data: myBookings } = useQuery({
    queryKey: ['myBookings', date],
    queryFn: () => loadBookingsForUser(userId),
  })

  const bookingDates = [...new Set(myBookings?.data.docs.map((booking) => humanDate(booking.from)))]

  const bookingZones = [
    ...new Set(myBookings?.data.docs.map((booking) => booking.space.value.zone?.value.name)),
  ]

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex max-w-5xl flex-col pb-24">
        {bookingDates.length < 1 && <Empty Icon={ListX} message="You have no bookings." />}
        {bookingDates &&
          bookingDates?.map((set, i) => (
            <Fragment key={`booking_${i}`}>
              <div
                className="flex flex-col gap-8 md:flex-row md:items-stretch"
                key={`my_booking_${set}_${i}`}
              >
                <DateHeading date={set} className="w-32 shrink-0 md:py-8" breakDate />
                <Separator horizontal />
                {bookingZones?.map((zone) => (
                  <>
                    <div className="flex max-w-lg flex-1 flex-col gap-4 md:py-8">
                      <span className="pb-2 pl-2 text-sm text-zinc-500">{zone}</span>
                      {myBookings?.data.docs.map(
                        (booking, i) =>
                          set === humanDate(booking.from) &&
                          zone === booking.space.value.zone?.value.name && (
                            <Fragment key={`user_booking${i}`}>
                              <div className="flex items-center gap-2">
                                <span className="flex flex-[2] items-center gap-1 font-medium">
                                  <Button
                                    onClick={() =>
                                      setSidebarState({
                                        title: booking.space?.value.name,
                                      })
                                    }
                                  >
                                    {booking.space?.value.name}
                                  </Button>
                                  {booking.space.value.group && (
                                    <span className="text-sm font-normal text-zinc-400">
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
                    </div>
                    <Separator horizontal />
                  </>
                ))}
              </div>
              <Separator />
            </Fragment>
          ))}
      </div>
    </div>
  )
}

export default MyBookings
