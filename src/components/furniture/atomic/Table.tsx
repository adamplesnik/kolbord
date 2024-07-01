import { HTMLAttributes } from 'react'
import { addWithSpace } from '../../../utils/addWithSpace'

const Table = ({ isBooked, children, className }: TableProps) => {
  return (
    <div
      className={
        'relative flex items-center justify-center rounded border border-black transition-colors' +
        addWithSpace(
          isBooked ? 'bg-zinc-50 group-hover:bg-zinc-100' : 'bg-gray-200 group-hover:bg-gray-300'
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