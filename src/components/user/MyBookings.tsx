import { useQuery } from '@tanstack/react-query'
import { ArrowRight, ListX } from 'lucide-react'
import { Fragment } from 'react/jsx-runtime'
import { useAuthContext } from '../../auth/AuthContext'
import { getToken } from '../../auth/helpers'
import { BookingQueryType } from '../../data/BookingRecord'
import { humanDate, humanTime } from '../../utils/human'
import Button from '../basic/Button'
import DateHeading from '../basic/DateHeading'
import Empty from '../basic/Empty'
import Heading from '../basic/Heading'
import { Value } from '../plan/PlanDateSelector'
import SpaceBookingSlot from '../space/SpaceBookingSlot'
import Separator from '../basic/Separator'

const MyBookings = ({ setSidebarTableId, workingDate }: MyBookingsProps) => {
  const { user } = useAuthContext()
  const date = workingDate ? new Date(workingDate.toString()) : new Date()

  const loadBookingsForUser = async (email: string | undefined): Promise<BookingQueryType> => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/bookings?&populate[users_permissions_user][fields][0]=email&populate[users_permissions_user][fields][1]=firstName&populate[users_permissions_user][fields][2]=lastName&fields[0]=from&fields[1]=to&populate[table][fields][0]=name&populate[table][populate][plan][fields][0]=name&populate[table][populate][group][fields][0]=name&filters[$and][0][from][$gte]=${date.toISOString()}&filters[users_permissions_user][email][$eq]=${email}&sort[0]=from&pagination[pageSize]=1000&pagination[withCount]=false`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    return response.json()
  }

  const { data: myBookings } = useQuery({
    queryKey: ['myBookings', date],
    enabled: user != undefined,
    queryFn: () => loadBookingsForUser(user?.email),
  })

  const bookingDates = [
    ...new Set(myBookings?.data.map((booking) => humanDate(booking.attributes.from))),
  ]

  const bookingZones = [
    ...new Set(
      myBookings?.data.map(
        (booking) => booking.attributes.table.data.attributes?.plan?.data?.attributes?.name
      )
    ),
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
                      {myBookings?.data.map(
                        (booking, i) =>
                          set === humanDate(booking.attributes.from) &&
                          zone ===
                            booking.attributes.table.data.attributes?.plan?.data?.attributes
                              ?.name && (
                            <Fragment key={`user_booking${i}`}>
                              <div className="flex items-center gap-2">
                                <span className="flex flex-[2] items-center gap-1 font-medium">
                                  <Button
                                    onClick={() =>
                                      setSidebarTableId(booking.attributes.table.data.id)
                                    }
                                  >
                                    {booking.attributes.table.data.attributes?.name}
                                  </Button>
                                  {booking.attributes.table.data.attributes?.group?.data && (
                                    <span className="text-sm font-normal text-slate-400">
                                      {
                                        booking.attributes.table.data.attributes?.group?.data
                                          .attributes.name
                                      }
                                    </span>
                                  )}
                                </span>
                                <SpaceBookingSlot
                                  isBooked={booking}
                                  tableId={booking.attributes.table.data.id}
                                  from={new Date(booking.attributes.from)}
                                  to={new Date(booking.attributes.to)}
                                >
                                  {humanTime(booking.attributes.from)}
                                  <ArrowRight
                                    className="size-4 text-slate-400 group-hover:text-slate-200"
                                    strokeWidth={1}
                                  />
                                  {humanTime(booking.attributes.to)}
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
  setSidebarTableId: (id: number) => void
  workingDate: Value
}

export default MyBookings
