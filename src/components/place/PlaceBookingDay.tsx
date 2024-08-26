import PlaceBookingSlot from './PlaceBookingSlot'

const PlaceBookingDay = ({ date, slots }: PlaceBookingDayProps) => {
  const getSlots = () => {
    if (slots === 'whole day') {
      return [
        {
          slot: {
            from: new Date(date.setHours(0, 0, 0, 0)),
            to: new Date(date.setHours(23, 59, 59, 999)),
          },
        },
      ]
    }
    if (slots === 'half-day') {
      return [
        {
          slot: {
            from: new Date(date.setHours(0, 0, 0, 0)),
            to: new Date(date.setHours(11, 59, 59, 999)),
          },
        },
        {
          slot: {
            from: new Date(date.setHours(12, 0, 0, 0)),
            to: new Date(date.setHours(23, 59, 59, 999)),
          },
        },
      ]
    }
    if (slots === '2 hours') {
      return [
        {
          slot: {
            from: new Date(date.setHours(6, 0, 0, 0)),
            to: new Date(date.setHours(7, 59, 59, 999)),
          },
        },
        {
          slot: {
            from: new Date(date.setHours(8, 0, 0, 0)),
            to: new Date(date.setHours(9, 59, 59, 999)),
          },
        },
        {
          slot: {
            from: new Date(date.setHours(10, 0, 0, 0)),
            to: new Date(date.setHours(11, 59, 59, 999)),
          },
        },
        {
          slot: {
            from: new Date(date.setHours(12, 0, 0, 0)),
            to: new Date(date.setHours(13, 59, 59, 999)),
          },
        },
        {
          slot: {
            from: new Date(date.setHours(14, 0, 0, 0)),
            to: new Date(date.setHours(15, 59, 59, 999)),
          },
        },
        {
          slot: {
            from: new Date(date.setHours(16, 0, 0, 0)),
            to: new Date(date.setHours(17, 59, 59, 999)),
          },
        },
      ]
    }
  }

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
        {getSlots()?.map((slot, i) => (
          <PlaceBookingSlot key={i} dateFrom={slot.slot.from} dateTo={slot.slot.to} />
        ))}
      </div>
    </div>
  )
}

type PlaceBookingDayProps = {
  date: Date
  slots: 'whole day' | 'half-day' | '2 hours' | '1 hour' | '30 minutes'
}

export default PlaceBookingDay
