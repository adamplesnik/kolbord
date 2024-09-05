import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuthContext } from '../../auth/AuthContext'
import { getToken } from '../../auth/helpers'
import { BookingRecord } from '../../data/BookingRecord'
import Heading from '../basic/Heading'
import { getSlots } from './generateSlots'
import PlaceBookingSlot from './PlaceBookingSlot'

type BookingQueryType = {
  data: BookingRecord[]
}

const PlaceBookingDay = ({ date, slots, tableId }: PlaceBookingDayProps) => {
  const { user } = useAuthContext()

  const humanDay = (date: Date) => {
    const todayString = new Date().toDateString()
    const tomorrowString = new Date(+new Date() + 86400000).toDateString()

    if (todayString === date.toDateString()) {
      return 'Today'
    } else if (tomorrowString === date.toDateString()) {
      return 'Tomorrow'
    } else {
      return date.toLocaleString([], { weekday: 'long' })
    }
  }

  let midnight = new Date()
  midnight.setHours(23, 59, 59, 999)
  midnight.setDate(date.getDate())

  const loadBookingsForTable = async (id: number): Promise<BookingQueryType> => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/bookings?&populate[users_permissions_user][fields][0]=email&populate[users_permissions_user][fields][1]=firstName&populate[users_permissions_user][fields][2]=lastName&fields[0]=from&fields[1]=to&filters[$and][0][table][id]=${id}&filters[$and][1][from][$gte]=${date.toISOString()}&filters[$and][2][to][$lte]=${midnight.toISOString()}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    return response.json()
  }

  const { data: loadedTableBooking } = useQuery({
    enabled: tableId > 0,
    queryKey: ['tableBooking', tableId, date],
    queryFn: () => loadBookingsForTable(tableId),
  })

  const createBooking = async (data: BookingRecord): Promise<BookingRecord> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.json()
  }

  const queryClient = useQueryClient()

  const { mutate: addBooking } = useMutation({
    mutationFn: (data: any) => createBooking(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tableBooking', tableId, date],
      })
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      })
    },
  })

  const deleteBooking = async (id: number): Promise<BookingRecord> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings/${id}`, {
      method: 'delete',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
    })
    return response.json()
  }

  const { mutate: removeBooking } = useMutation({
    mutationFn: (id: number) => deleteBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tableBooking', tableId, date],
      })
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      })
    },
  })

  return (
    <div className="flex flex-col gap-3">
      <Heading size={4}>
        <span className="font-semibold text-slate-900">{humanDay(date)}</span>
        <span className="flex-1 ps-1 text-sm text-slate-600">
          {date.toLocaleString([], {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>
      </Heading>
      <div className="flex flex-wrap gap-1">
        {getSlots(date, slots).map((slot, i) => {
          const { from, to } = slot.slot
          let bookedBy = ''
          let isBookedByMe = false

          const isBooked = loadedTableBooking?.data.find(
            (booking) =>
              new Date(booking.attributes.from) <= from && new Date(booking.attributes.to) >= to
          )

          if (isBooked) {
            const { email, firstName, lastName } =
              isBooked.attributes.users_permissions_user.data.attributes
            isBookedByMe = email === user?.email
            bookedBy = `${firstName} ${lastName}`
          }

          const data = {
            data: {
              from: from,
              to: to,
              users_permissions_user: user?.id,
              table: tableId,
            },
          }

          return (
            <PlaceBookingSlot
              key={`${from.toISOString}_${to.toISOString}_${i}`}
              dateFrom={from}
              dateTo={to}
              isBooked={isBooked != undefined}
              onClick={() => {
                if (isBooked && isBookedByMe) {
                  removeBooking(isBooked.id)
                } else if (!isBooked) {
                  addBooking(data)
                }
              }}
              bookedBy={bookedBy}
              isBookedByMe={isBookedByMe}
            />
          )
        })}
      </div>
    </div>
  )
}

type PlaceBookingDayProps = {
  date: Date
  slots: 'whole day' | 'half-day' | 'hours 2' | 'hour 1' | 'minutes 30' | string
  tableId: number
}

export default PlaceBookingDay
