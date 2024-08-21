import { HTMLAttributes } from 'react'
import { addWithSpace } from '../../../utils/addWithSpace'

const Table = ({ isBooked, children, className, height, width }: TableProps) => {
  return (
    <div
      className={
        'relative flex items-center justify-center rounded border border-black bg-zinc-100 transition-colors group-hover:bg-zinc-200' +
        addWithSpace(isBooked ? 'border-dashed' : '') +
        addWithSpace(className)
      }
      style={{ height: height - 2, width: width - 2 }}
    >
      {children}
    </div>
  )
}

export type TableProps = {
  height: number
  width: number
  isBooked?: boolean | undefined | ''
} & HTMLAttributes<HTMLDivElement>

export default Table
