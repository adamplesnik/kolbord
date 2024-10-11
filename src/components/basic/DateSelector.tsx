import { useContext } from 'react'
import Calendar from 'react-calendar'
import { DateContext, DateContextType } from '../../providers/DateContextProvider'
import Button from '../atoms/Button'
import CustomTooltip from './CustomTooltip'
import DateHeading from './DateHeading'

const DateSelector = () => {
  const { date, setDate } = useContext(DateContext) as DateContextType

  const isDirty = date && new Date(date?.toString()).toDateString() != new Date().toDateString()

  return (
    <>
      <Button buttonType="menu" data-tooltip-id="calendarTooltip">
        {date && <DateHeading date={date.toString()} dayClassName="hidden sm:block" />}
        {isDirty && <span className="size-2 shrink-0 rounded-full bg-pink-600"></span>}
      </Button>
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
