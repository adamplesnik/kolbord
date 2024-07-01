import { ArrowRight, Clock } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { BookingRecord } from '../data/BookingRecord'

const SidebarBooking = ({ booking }: SidebarBookingProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-0.5 text-sm">
        <span className="font-semibold">
          {booking.from?.toLocaleString([], { weekday: 'short' })}
        </span>
        <span className="flex-1">
          {booking.from?.toLocaleString([], {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>
        {booking.from?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        <ArrowRight className="size-4 opacity-50" />
        {booking.to?.getHours()}:{booking.to?.getMinutes()}
      </div>
      <span className="text-xs">{booking.user}</span>
    </div>
  )
}

export type SidebarBookingProps = {
  booking: BookingRecord
} & HTMLAttributes<HTMLDivElement>

export default SidebarBooking
