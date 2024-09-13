import { addWithSpace } from '../../utils/addWithSpace'
import { humanDate, humanDayName } from '../../utils/human'
import Heading from './Heading'

const DateHeading = ({ breakDate = false, date, className }: DateHeadingProps) => {
  return (
    <Heading size={4} className={className}>
      <span className={'text-slate-900' + addWithSpace(breakDate && 'flex')}>
        {humanDayName(date)}
      </span>
      <span
        className={'flex-1 text-sm font-normal text-slate-500' + addWithSpace(!breakDate && 'pl-1')}
      >
        {humanDate(date)}
      </span>
    </Heading>
  )
}

type DateHeadingProps = {
  breakDate?: boolean | undefined
  className?: string | undefined
  date: Date | string
}

export default DateHeading
