import { HTMLAttributes } from 'react'
import { addWithSpace } from '../../utils/addWithSpace'
import Chair from './atomic/Chair'
import Table from './atomic/Table'

const WorkTable = ({ rotate = 0, x = 0, y = 0, className }: WorkTableProps) => {
  const rotationClasses: Record<number, string> = {
    90: 'rotate-90',
    180: 'rotate-180',
    270: '-rotate-90',
  }

  return (
    <div
      className={
        'absolute inline-flex size-[160px] flex-col items-center justify-between p-px pt-2' +
        addWithSpace(rotationClasses[rotate] || '') +
        addWithSpace(className)
      }
      style={{ top: y, left: x }}
    >
      <Chair />
      <Table />
    </div>
  )
}

export type WorkTableProps = {
  rotate?: 0 | 90 | 180 | 270
  x?: number
  y?: number
} & HTMLAttributes<HTMLDivElement>

export default WorkTable
