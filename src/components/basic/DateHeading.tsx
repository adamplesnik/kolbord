import clsx from 'clsx'
import { humanDate, humanDayName } from '../../utils/human'

const DateHeading = ({ breakDate = false, date, className, dayClassName }: DateHeadingProps) => {
  return (
    <div
      className={clsx('flex shrink-0 gap-1', breakDate ? 'flex-col' : 'items-center', className)}
    >
      <span className={clsx('font-medium', dayClassName)}>{humanDayName(date)}</span>
      <span className={clsx('flex-1 shrink-0 text-zinc-500')}>{humanDate(date)}</span>
    </div>
  )
}

type DateHeadingProps = {
  breakDate?: boolean | undefined
  className?: string | undefined
  date: Date | string
  dayClassName?: string | undefined
}

export default DateHeading
