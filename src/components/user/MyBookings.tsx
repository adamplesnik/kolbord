import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { ArrowRight, ListX } from 'lucide-react'
import qs from 'qs'
import { Fragment } from 'react/jsx-runtime'
import { BookingRecord } from '../../data/BookingRecord'
import { humanDate, humanTime } from '../../utils/human'
import Button from '../basic/Button'
import DateHeading from '../basic/DateHeading'
import Empty from '../basic/Empty'
import Heading from '../basic/Heading'
import Separator from '../basic/Separator'
import { Value } from '../plan/PlanDateSelector'
import SpaceBookingSlot from '../space/SpaceBookingSlot'
import { SpaceType } from '../space/spaceType'

const MyBookings = ({ setSidebarTable, workingDate }: MyBookingsProps) => {
  const { userId, getToken } = useAuth()
  const date = workingDate ? new Date(workingDate.toString()) : new Date()

  const loadBookingsForUser = async (
    userId: string | null | undefined
  ): Promise<{ data: { docs: BookingRecord[] } }> => {
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
    return await axios.get(`${import.meta.env.VITE_API_PAYLOAD_URL}/bookings?${query}&depth=3`, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    })
  }

  const { data: myBookings } = useQuery({
    queryKey: ['myBookings', date],
    queryFn: () => loadBookingsForUser(userId),
  })
  console.log(myBookings)

  const bookingDates = [...new Set(myBookings?.data.docs.map((booking) => humanDate(booking.from)))]

  const bookingZones = [
    ...new Set(myBookings?.data.docs.map((booking) => booking.space.value.zone?.value.name)),
  ]

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex max-w-5xl flex-col p-8 pb-24">
        {bookingDates.length < 1 && <Empty Icon={ListX} message="You have no bookings." />}
        {bookingDates.length > 0 && (
          <Heading size={3} className="pb-8">
            Your bookings
          </Heading>
        )}
        {bookingDates &&
          bookingDates?.map((set, i) => (
            <>
              <div
                className="flex flex-col gap-8 md:flex-row md:items-stretch"
                key={`my_booking_${set}_${i}`}
              >
                <DateHeading date={set} className="w-32 shrink-0 md:py-8" breakDate />
                <Separator horizontal />
                {bookingZones?.map((zone) => (
                  <>
                    <div className="flex max-w-lg flex-1 flex-col gap-4 md:py-8">
                      <span className="pb-2 pl-2 text-sm text-slate-500">{zone}</span>
                      {myBookings?.data.docs.map(
                        (booking, i) =>
                          set === humanDate(booking.from) &&
                          zone === booking.space.value.zone?.value.name && (
                            <Fragment key={`user_booking${i}`}>
                              <div className="flex items-center gap-2">
                                <span className="flex flex-[2] items-center gap-1 font-medium">
                                  <Button onClick={() => setSidebarTable(booking.space.value)}>
                                    {booking.space?.value.name}
                                  </Button>
                                  {booking.space.value.group && (
                                    <span className="text-sm font-normal text-slate-400">
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
                                    className="size-4 text-slate-400 group-hover:text-slate-200"
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
            </>
          ))}
      </div>
    </div>
  )
}

type MyBookingsProps = {
  setSidebarTable: (spaceId: SpaceType) => void
  workingDate: Value
}

export default MyBookings
