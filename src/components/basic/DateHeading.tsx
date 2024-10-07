import clsx from 'clsx'
import { humanDate, humanDayName } from '../../utils/human'
import Heading from './Heading'

const DateHeading = ({ breakDate = false, date, className }: DateHeadingProps) => {
  return (
    <Heading size={4} className={className}>
      <span className={clsx('text-zinc-900', breakDate && 'flex')}>{humanDayName(date)}</span>
      <span className={clsx('flex-1 text-sm font-normal text-zinc-500', !breakDate && 'pl-1')}>
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
