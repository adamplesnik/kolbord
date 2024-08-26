import { HTMLAttributes } from 'react'
import PlaceBookingDay from './PlaceBookingDay'

const PlaceBooking = ({ tableId, slots }: PlaceBookingProps) => {
  const dates = [...Array(7)]
    .map((_, index) => {
      let date = new Date()
      date.setDate(date.getDate() + index)
      return date
    })
    .filter((date) => date.getDay() !== 0 && date.getDay() !== 6)

  return (
    <div className="flex flex-col gap-6">
      {dates.map((date, i) => {
        return <PlaceBookingDay key={`slot${date}${i}`} date={date} slots={slots} />
      })}
    </div>
  )
}

export type PlaceBookingProps = {
  tableId: number
  slots: string
} & HTMLAttributes<HTMLDivElement>

export default PlaceBooking
