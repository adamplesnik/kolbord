import { CalendarDays } from 'lucide-react'
import Calendar from 'react-calendar'
import { Tooltip } from 'react-tooltip'
import Button from '../basic/Button'

type ValuePiece = Date | null
export type Value = ValuePiece | [ValuePiece, ValuePiece]

const PlanDateSelector = ({ onChange, workingDate }: PlanDateSelectorProps) => {
  const isDirty =
    workingDate && new Date(workingDate?.toString()).toDateString() != new Date().toDateString()

  return (
    <>
      <div data-tooltip-id="calendarTooltip">
        <Button Icon={CalendarDays} className="shrink-0">
          {workingDate?.toLocaleString([], { dateStyle: 'medium' })}
          {isDirty && <span className="size-2 rounded-full bg-red-600"></span>}
        </Button>
      </div>
      <Tooltip id="calendarTooltip" openOnClick clickable>
        <Calendar onChange={(value) => onChange(value)} value={workingDate} />
      </Tooltip>
    </>
  )
}

type PlanDateSelectorProps = {
  workingDate: Value
  onChange: (value: Value) => void
}

export default PlanDateSelector
