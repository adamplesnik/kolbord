import { CalendarDays } from 'lucide-react'
import { useContext } from 'react'
import Calendar from 'react-calendar'
import { DateContext, DateContextType } from '../../providers/DateContextProvider'
import Button from './Button'
import CustomTooltip from './CustomTooltip'

const DateSelector = () => {
  const { date, setDate } = useContext(DateContext) as DateContextType

  const isDirty = date && new Date(date?.toString()).toDateString() != new Date().toDateString()

  return (
    <>
      <div data-tooltip-id="calendarTooltip">
        <Button Icon={CalendarDays} className="shrink-0">
          {date?.toLocaleString([], { dateStyle: 'medium' })}
          {isDirty && <span className="size-2 rounded-full bg-red-600"></span>}
        </Button>
      </div>
      <CustomTooltip
        id="calendarTooltip"
        children={<Calendar onChange={(value) => setDate(value)} value={date} />}
        openOnClick
        clickable
      />
    </>
  )
}

export default DateSelector
