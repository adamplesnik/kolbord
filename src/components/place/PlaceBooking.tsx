import { HTMLAttributes } from 'react'
import PlaceBookingDay from './PlaceBookingDay'

const PlaceBooking = ({ tableId, slots, workingDate }: PlaceBookingProps) => {
  const noWeekends = [...Array(7)]
    .map((_, index) => {
      let date = new Date()
      if (workingDate) {
        date = new Date(workingDate)
      }
      date.setDate(date.getDate() + index)
      return date
    })
    .filter((date) => date.getDay() !== 0 && date.getDay() !== 6)

  return (
    <div className="flex flex-col gap-8">
      {noWeekends.map((date, i) => {
        return (
          <PlaceBookingDay key={`slot${date}${i}`} date={date} slots={slots} tableId={tableId} />
        )
      })}
    </div>
  )
}

export type PlaceBookingProps = {
  tableId: number
  slots: string
  workingDate: string | undefined
} & HTMLAttributes<HTMLDivElement>

export default PlaceBooking
