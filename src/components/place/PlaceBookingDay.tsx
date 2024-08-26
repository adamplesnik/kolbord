import { getSlots } from './generateSlots'
import PlaceBookingSlot from './PlaceBookingSlot'

const PlaceBookingDay = ({ date, slots, tableId }: PlaceBookingDayProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs">
        <span className="font-semibold text-slate-900">
          {date.toLocaleString([], { weekday: 'long' })}
        </span>
        <span className="flex-1 ps-1 text-slate-600">
          {date.toLocaleString([], {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {getSlots(date, slots).map((slot, i) => (
          <PlaceBookingSlot key={i} dateFrom={slot.slot.from} dateTo={slot.slot.to} />
        ))}
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
