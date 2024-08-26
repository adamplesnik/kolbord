import PlaceBookingSlot from './PlaceBookingSlot'

const PlaceBookingDay = ({ date, slots }: PlaceBookingDayProps) => {
  const generateSlots = (startHours: number, endHours: number, stepHours: number) => {
    const slots = []
    let currentTime = new Date(date)
    currentTime.setHours(startHours, 0, 0, 0)

    while (currentTime.getHours() + currentTime.getMinutes() / 60 < endHours) {
      const startSlot = new Date(currentTime)
      currentTime.setMinutes(currentTime.getMinutes() + stepHours * 60)
      const endSlot = new Date(currentTime)
      endSlot.setMilliseconds(999)

      slots.push({
        slot: {
          from: startSlot,
          to: endSlot,
        },
      })
    }

    return slots
  }

  const getSlots = () => {
    switch (slots) {
      case 'whole day':
        return generateSlots(0, 24, 24)
      case 'half-day':
        return generateSlots(0, 24, 12)
      case 'hours 2':
        return generateSlots(6, 18, 2)
      case 'hour 1':
        return generateSlots(6, 18, 1)
      case 'minutes 30':
        return generateSlots(6, 18, 0.5)

      default:
        return []
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
        {getSlots().map((slot, i) => (
          <PlaceBookingSlot key={i} dateFrom={slot.slot.from} dateTo={slot.slot.to} />
        ))}
      </div>
    </div>
  )
}

type PlaceBookingDayProps = {
  date: Date
  slots: 'whole day' | 'half-day' | 'hours 2' | 'hour 1' | 'minutes 30' | string
}

export default PlaceBookingDay
