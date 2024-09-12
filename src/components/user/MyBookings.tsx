import { useQuery } from '@tanstack/react-query'
import { ArrowRight } from 'lucide-react'
import { Fragment } from 'react/jsx-runtime'
import { useAuthContext } from '../../auth/AuthContext'
import { getToken } from '../../auth/helpers'
import { BookingQueryType } from '../../data/BookingRecord'
import { humanDate, humanTime } from '../../utils/human'
import DateHeading from '../basic/DateHeading'
import { Value } from '../plan/PlanDateSelector'
import SpaceBookingSlot from '../space/SpaceBookingSlot'

const MyBookings = ({ workingDate }: MyBookingsProps) => {
  const { user } = useAuthContext()
  const date = workingDate ? new Date(workingDate.toString()) : new Date()

  const loadBookingsForUser = async (email: string | undefined): Promise<BookingQueryType> => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/bookings?&populate[users_permissions_user][fields][0]=email&populate[users_permissions_user][fields][1]=firstName&populate[users_permissions_user][fields][2]=lastName&fields[0]=from&fields[1]=to&populate[table][fields][0]=name&populate[table][populate][plan][fields][0]=name&filters[$and][0][from][$gte]=${date.toISOString()}&filters[users_permissions_user][email][$eq]=${email}&sort[0]=from`,
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

  return (
    <div className="min-h-screen bg-slate-200/0">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 p-8 pb-24">
        {bookingDates?.map((set, i) => (
          <div className="flex flex-col gap-2" key={`my_booking_${set}_${i}`}>
            <DateHeading date={set} />
            <div className="flex flex-wrap items-center gap-4">
              {myBookings?.data.map((booking, i) => {
                console.log(booking)
                return (
                  set === humanDate(booking.attributes.from) && (
                    <Fragment key={`user_booking${i}`}>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {booking.attributes.table.data.attributes?.name}
                        </span>
                        <span className="text-sm text-slate-600">
                          {booking.attributes.table.data.attributes?.plan?.data?.attributes?.name}
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
                )
              })}
            </div>
            <div className="h-px w-full bg-slate-200 last-of-type:hidden"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

type MyBookingsProps = {
  workingDate: Value
}

export default MyBookings
