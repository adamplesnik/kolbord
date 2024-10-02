import { useContext } from 'react'
import { DateContext, DateContextType } from '../../context/DateContextProvider.tsx'
import SpaceBookingDay from './SpaceBookingDay.tsx'

const SpaceBooking = () => {
  const { date } = useContext(DateContext) as DateContextType

  const noWeekends = [...Array(7)]
    .map((_, index) => {
      let newDate = new Date()
      if (date) {
        newDate = new Date(date.toString())
      }
      newDate.setDate(newDate.getDate() + index)
      return newDate
    })
    .filter((newDate) => newDate.getDay() !== 0 && newDate.getDay() !== 6)

  return (
    <div className="flex flex-col gap-8">
      {noWeekends.map((date, i) => {
        return <SpaceBookingDay key={`slot${date}${i}`} date={date} />
      })}
    </div>
  )
}

export default SpaceBooking
