import { useAuth } from '@clerk/clerk-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import clsx from 'clsx'
import { ArrowRight, Check, Trash2 } from 'lucide-react'
import { HTMLAttributes, useState } from 'react'
import { BookingType, BookingTypeDeep } from '../../types/bookingType'
import { humanTime } from '../../utils/human'
import CustomTooltip from '../basic/CustomTooltip'
import UserName from '../user/UserName'

const SpaceBookingSlot = ({ from, isBooked, spaceId, to, ...props }: SpaceBookingSlotProps) => {
  const { userId, getToken, orgId } = useAuth()
  const [mouseOut, setMouseOut] = useState(false)

  const tooltipId = (from.getTime() + to.getTime() + Math.random() * 100).toString()
  const beforeNow = to <= new Date()

  const bookedBy = isBooked?.sub
  let isBookedByMe = false

  if (isBooked) {
    const userSub = isBooked.sub
    isBookedByMe = userSub === userId
  }

  const data = {
    id: 0,
    from: from,
    to: to,
    sub: userId,
    space: {
      relationTo: 'spaces',
      value: spaceId,
    },
    org: orgId,
  }

  const createBooking = async (data: BookingType): Promise<BookingType> => {
    return axios.post(`${import.meta.env.VITE_API_URL}/bookings`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        'Content-Type': 'application/json',
      },
    })
  }

  const queryClient = useQueryClient()

  const { mutate: addBooking } = useMutation({
    mutationFn: (data: BookingType) => createBooking(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tableBooking', spaceId, from],
      })
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      })
      queryClient.invalidateQueries({
        queryKey: ['myBookings', from],
      })
    },
  })

  const deleteBooking = async (bookingId: number): Promise<BookingType> => {
    return axios.delete(`${import.meta.env.VITE_API_URL}/bookings/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        'Content-Type': 'application/json',
      },
    })
  }

  const { mutate: removeBooking } = useMutation({
    mutationFn: (bookingId: number) => deleteBooking(bookingId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tableBooking', spaceId, from],
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
        className={clsx(
          'group relative flex h-8 flex-1 items-center justify-center gap-1 overflow-clip rounded-full border p-1 text-sm font-medium transition-colors',
          !isBooked &&
            'cursor-pointer border-slate-300 bg-teal-50 hover:border-teal-800 hover:bg-teal-700 hover:text-white active:bg-teal-900',
          isBooked && !isBookedByMe && 'border-rose-300 bg-rose-50',
          isBookedByMe &&
            'cursor-pointer border-slate-700 bg-slate-500 text-white hover:bg-slate-700 active:bg-slate-800',
          beforeNow && 'pointer-events-none opacity-30'
        )}
        {...props}
      >
        {humanTime(from)}
        <div
          className={clsx(
            'flex flex-col transition-transform duration-500',
            isBooked ? 'translate-y-0' : 'translate-y-8 text-slate-600 group-hover:text-slate-300',
            isBookedByMe && mouseOut && 'translate-y-0 text-slate-200 group-hover:-translate-y-8'
          )}
        >
          <ArrowRight className="h-8 w-4" strokeWidth={1.5} />
          <Check className="h-8 w-4" strokeWidth={2} />
          <Trash2 className="h-8 w-4 text-rose-300" strokeWidth={1.5} />
        </div>
        {humanTime(to)}
      </div>

      {isBooked && !isBookedByMe && (
        <CustomTooltip id={tooltipId}>
          <span className="text-sm">
            <UserName subject={bookedBy} />
          </span>
        </CustomTooltip>
      )}
    </>
  )
}

type SpaceBookingSlotProps = {
  bookedBy?: string
  from: Date
  isBooked?: BookingType | BookingTypeDeep | undefined
  spaceId: number | undefined
  to: Date
} & HTMLAttributes<HTMLDivElement>

export default SpaceBookingSlot
