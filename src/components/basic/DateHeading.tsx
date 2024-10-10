import clsx from 'clsx'
import { humanDate, humanDayName } from '../../utils/human'

const DateHeading = ({ breakDate = false, date, className }: DateHeadingProps) => {
  return (
    <div className={clsx('flex gap-1', breakDate ? 'flex-col' : 'items-center', className)}>
      <span className={clsx('hidden font-medium sm:inline-block')}>{humanDayName(date)}</span>
      <span className={clsx('flex-1 text-sm text-zinc-600')}>{humanDate(date)}</span>
    </div>
  )
}

type DateHeadingProps = {
  breakDate?: boolean | undefined
  className?: string | undefined
  date: Date | string
}

export default DateHeading
