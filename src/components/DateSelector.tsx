import { CalendarDays } from 'lucide-react'
import Calendar from 'react-calendar'
import { Tooltip } from 'react-tooltip'
import Button from './Button'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

const DateSelector = ({ onChange, workingDate }: DateSelectorProps) => {
  return (
    <>
      <div data-tooltip-id="calendarTooltip">
        <Button>
          <CalendarDays size={18} />
          {workingDate?.toLocaleString([], { dateStyle: 'medium' })}
        </Button>
      </div>
      <Tooltip id="calendarTooltip" openOnClick clickable>
        <Calendar onChange={(value) => onChange(value)} value={workingDate} />
      </Tooltip>
    </>
  )
}

type DateSelectorProps = {
  workingDate: Value
  onChange: (value: Value) => void
}

export default DateSelector
