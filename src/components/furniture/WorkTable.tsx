import { HTMLAttributes } from 'react'
import Chair from './atomic/Chair'
import Table from './atomic/Table'

const WorkTable = ({ rotate = 0 }) => {
  const rotationClasses: Record<number, string> = {
    90: 'rotate-90',
    180: 'rotate-180',
    270: '-rotate-90',
  }

  return (
    <div
      className={
        'inline-flex size-[160px] flex-col items-center justify-between p-px pt-2' +
        (rotationClasses[rotate] || '')
      }
    >
      <Chair />
      <Table />
    </div>
  )
}

export type WorkTableProps = {
  rotate?: 0 | 90 | 180 | 270
} & HTMLAttributes<HTMLDivElement>

export default WorkTable
