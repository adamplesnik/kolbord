import { addWithSpace } from '../../utils/addWithSpace'
import { humanDate, humanDayName } from '../../utils/human'
import Heading from './Heading'

const DateHeading = ({ breakDate = false, date, className }: DateHeadingProps) => {
  return (
    <Heading size={4} className={className}>
      <span className={'font-semibold text-slate-900' + addWithSpace(breakDate && 'flex')}>
        {humanDayName(date)}
      </span>
      <span className="flex-1 ps-1 text-sm text-slate-600">{humanDate(date)}</span>
    </Heading>
  )
}

type DateHeadingProps = {
  breakDate?: boolean | undefined
  className?: string | undefined
  date: Date | string
}

export default DateHeading
