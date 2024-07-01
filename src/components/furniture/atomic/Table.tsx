import { HTMLAttributes } from 'react'
import { addWithSpace } from '../../../utils/addWithSpace'

const Table = ({ isBooked, children, className }: TableProps) => {
  return (
    <div
      className={
        'flex items-center justify-center rounded border border-black transition-colors' +
        addWithSpace(
          isBooked
            ? 'border-dashed bg-red-50 group-hover:bg-rose-50'
            : 'bg-zinc-200 group-hover:bg-slate-200'
        ) +
        addWithSpace(className)
      }
    >
      {children}
    </div>
  )
}

export type TableProps = {
  isBooked?: boolean | undefined
} & HTMLAttributes<HTMLDivElement>

export default Table
