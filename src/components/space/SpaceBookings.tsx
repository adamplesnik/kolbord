import { ArrowRight } from 'lucide-react'
import { BookingType } from '../../types/bookingType'
import { humanTime } from '../../utils/human'
import UserName from '../user/UserName'

const SpaceBookings = ({ bookings }: { bookings: BookingType[] }) => {
  return (
    <>
      {bookings?.map((b: BookingType, i: number) => (
        <div className="flex items-center gap-1" key={`${b.id}_${i}`}>
          <div className="flex w-28 items-center justify-evenly gap-1 text-zinc-600">
            {humanTime(b.from)}
            <ArrowRight className="size-4 text-zinc-500" strokeWidth={1} />
            {humanTime(b.to)}
          </div>
          <span className="font-semibold">
            <UserName subject={b.sub} />
          </span>
        </div>
      ))}
    </>
  )
}

export default SpaceBookings
