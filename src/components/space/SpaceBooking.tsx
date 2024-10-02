import { HTMLAttributes } from 'react'
import SpaceBookingDay from './SpaceBookingDay.tsx'

const SpaceBooking = ({ workingDate }: SpaceBookingProps) => {
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
        return <SpaceBookingDay key={`slot${date}${i}`} date={date} />
      })}
    </div>
  )
}

export type SpaceBookingProps = {
  workingDate: string | undefined
} & HTMLAttributes<HTMLDivElement>

export default SpaceBooking
