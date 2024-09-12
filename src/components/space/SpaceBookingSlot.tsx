import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowRight, Trash2 } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { Tooltip } from 'react-tooltip'
import { useAuthContext } from '../../auth/AuthContext'
import { getToken } from '../../auth/helpers'
import { BookingRecord } from '../../data/BookingRecord'
import { addWithSpace } from '../../utils/addWithSpace'
import { humanTime } from '../../utils/human'

const SpaceBookingSlot = ({
  from,
  isBooked,
  onClick,
  tableId,
  to,
  ...props
}: SpaceBookingSlotProps) => {
  const { user } = useAuthContext()

  const tooltipId = (from.getTime() + to.getTime()).toString()

  let bookedBy = ''
  let isBookedByMe = false

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
        queryKey: ['tableBooking', tableId, from],
      })
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      })
      queryClient.invalidateQueries({
        queryKey: ['myBookings', from],
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
        queryKey: ['tableBooking', tableId, from],
      })
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      })
      queryClient.invalidateQueries({
        queryKey: ['myBookings', from],
      })
    },
  })

  return (
    <>
      <div
        onClick={() => {
          if (isBooked && isBookedByMe) {
            removeBooking(isBooked.id)
          } else if (!isBooked) {
            addBooking(data)
          }
        }}
        data-tooltip-id={tooltipId}
        className={
          'relative flex h-8 flex-1 items-center justify-center gap-1 overflow-clip rounded-full border p-1 text-sm font-medium transition-colors' +
          addWithSpace(
            !isBooked &&
              'group cursor-pointer group-hover:border-teal-800 group-hover:bg-teal-700 group-hover:text-white hover:border-teal-800 hover:bg-teal-700 hover:text-white active:bg-teal-900'
          ) +
          addWithSpace(!isBooked && 'border-slate-300 bg-teal-50') +
          addWithSpace(isBooked && !isBookedByMe && 'border-rose-300 bg-rose-50 opacity-40') +
          addWithSpace(
            isBookedByMe &&
              'cursor-pointer border-slate-800 bg-slate-700 text-white hover:bg-slate-600 active:bg-slate-900'
          )
        }
        {...props}
      >
        {humanTime(from)}
        <ArrowRight className="size-4 text-slate-400 group-hover:text-slate-200" strokeWidth={1} />
        {humanTime(to)}
      </div>

      {isBooked && (
        <Tooltip id={tooltipId}>
          {isBookedByMe ?
            <span className="flex items-center gap-1 text-sm">
              <Trash2 className="size-5" strokeWidth={1} /> Click to unbook.
            </span>
          : <span className="text-sm">{bookedBy}</span>}
        </Tooltip>
      )}
    </>
  )
}

type SpaceBookingSlotProps = {
  bookedBy?: string
  from: Date
  isBooked?: BookingRecord | undefined
  tableId: number
  to: Date
} & HTMLAttributes<HTMLDivElement>

export default SpaceBookingSlot
