import { humanDate, humanDayName } from '../../utils/human'
import Heading from './Heading'

const DateHeading = ({ date }: DateHeadingProps) => {
  return (
    <Heading size={4}>
      <span className="font-semibold text-slate-900">{humanDayName(date)}</span>
      <span className="flex-1 ps-1 text-sm text-slate-600">{humanDate(date)}</span>
    </Heading>
  )
}

type DateHeadingProps = {
  date: Date | string
}

export default DateHeading
