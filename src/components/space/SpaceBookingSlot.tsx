import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowRight, Check, Trash2 } from 'lucide-react'
import { HTMLAttributes, useState } from 'react'
import { Tooltip } from 'react-tooltip'
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
  const [mouseOut, setMouseOut] = useState(false)

  const tooltipId = (from.getTime() + to.getTime() + Math.random() * 100).toString()
  const beforeNow = to <= new Date()

  let bookedBy = ''
  let isBookedByMe = false

  if (isBooked) {
    const { email, firstName, lastName } =
      isBooked.attributes.users_permissions_user.data.attributes
    isBookedByMe = email === 'mike@tester.test'
    bookedBy = `${firstName} ${lastName}`
  }

  const data = {
    data: {
      from: from,
      to: to,
      users_permissions_user: 1,
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
            setMouseOut(false)
          } else if (!isBooked && !beforeNow) {
            addBooking(data)
          }
        }}
        onMouseLeave={() => isBookedByMe && setMouseOut(true)}
        data-tooltip-id={tooltipId}
        className={
          'group relative flex h-8 flex-1 items-center justify-center gap-1 overflow-clip rounded-full border p-1 text-sm font-medium transition-colors' +
          addWithSpace(
            !isBooked &&
              'cursor-pointer border-slate-300 bg-teal-50 hover:border-teal-800 hover:bg-teal-700 hover:text-white active:bg-teal-900'
          ) +
          addWithSpace(isBooked && !isBookedByMe && 'border-rose-300 bg-rose-50') +
          addWithSpace(
            isBookedByMe &&
              'cursor-pointer border-slate-700 bg-slate-500 text-white hover:bg-slate-700 active:bg-slate-800'
          ) +
          addWithSpace(beforeNow && 'pointer-events-none opacity-30')
        }
        {...props}
      >
        {humanTime(from)}
        <div
          className={
            'flex flex-col transition-transform duration-500' +
            addWithSpace(
              isBooked ? 'translate-y-0' : 'translate-y-8 text-slate-600 group-hover:text-slate-300'
            ) +
            addWithSpace(
              isBookedByMe && mouseOut && 'translate-y-0 text-slate-200 group-hover:-translate-y-8'
            )
          }
        >
          <ArrowRight className="h-8 w-4" strokeWidth={1.5} />
          <Check className="h-8 w-4" strokeWidth={2} />
          <Trash2 className="h-8 w-4 text-rose-300" strokeWidth={1.5} />
        </div>
        {humanTime(to)}
      </div>

      {isBooked && !isBookedByMe && (
        <Tooltip id={tooltipId}>
          <span className="text-sm">{bookedBy}</span>
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
