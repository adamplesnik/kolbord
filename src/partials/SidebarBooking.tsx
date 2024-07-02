import { ArrowRight } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { BookingRecord } from '../data/BookingRecord'
import { isToday } from '../utils/isToday'

const SidebarBooking = ({ booking }: SidebarBookingProps) => {
  const bookedToday = isToday(booking.to)

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-0.5 text-sm">
        {bookedToday ? (
          <span className="flex-1 font-semibold">Today</span>
        ) : (
          <>
            <span className="font-semibold">
              {new Date(booking.from).toLocaleString([], { weekday: 'short' })}
            </span>
            <span className="flex-1 ps-1 opacity-80">
              {new Date(booking.from).toLocaleString([], {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </>
        )}
        {new Date(booking.from).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        <ArrowRight className="size-4 opacity-50" />
        {new Date(booking.to).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
      <span className="text-xs">{booking.user}</span>
    </div>
  )
}

export type SidebarBookingProps = {
  booking: BookingRecord
} & HTMLAttributes<HTMLDivElement>

export default SidebarBooking
