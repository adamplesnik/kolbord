import { HTMLAttributes } from 'react'
import { addWithSpace } from '../../../utils/addWithSpace'

const Table = ({ isBooked, children, className }: TableProps) => {
  return (
    <div
      className={
        'relative flex items-center justify-center rounded border border-black bg-zinc-100 transition-colors group-hover:bg-zinc-200' +
        addWithSpace(isBooked ? 'border-dashed' : '') +
        addWithSpace(className)
      }
    >
      {children}
    </div>
  )
}

export type TableProps = {
  isBooked?: boolean | undefined | ''
} & HTMLAttributes<HTMLDivElement>

export default Table
