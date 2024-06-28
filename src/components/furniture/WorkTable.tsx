import { HTMLAttributes } from 'react'
import { addWithSpace } from '../../utils/addWithSpace'
import Chair from './atomic/Chair'
import Table from './atomic/Table'

const WorkTable = ({
  tableName,
  tableGroup,
  rotate = 0,
  x = 0,
  y = 0,
  available = true,
  booked = false,
  className,
}: WorkTableProps) => {
  const rotationClasses: Record<number, string> = {
    90: 'rotate-90',
    180: 'rotate-180',
    270: '-rotate-90',
  }

  const contraRotationClasses: Record<number, string> = {
    90: '-rotate-90 flex-col',
    180: '-rotate-180',
    270: 'rotate-90',
  }

  return (
    <div
      id={'table-' + (tableGroup ? tableGroup : '') + tableName}
      className={
        'absolute inline-flex size-[160px] flex-col items-center justify-between p-px pt-2' +
        addWithSpace(available ? 'group cursor-pointer' : 'opacity-30') +
        addWithSpace(rotationClasses[rotate] || '') +
        addWithSpace(className)
      }
      style={{ top: y, left: x }}
    >
      <Chair />
      <Table />
      <div
        className={
          'absolute bottom-0 flex flex-col items-center gap-1 p-2' +
          addWithSpace(contraRotationClasses[rotate] || '')
        }
      >
        <div className="flex items-center gap-1">
          {tableGroup ? (
            <span className="rounded border px-1 text-xs opacity-40">{tableGroup}</span>
          ) : (
            ''
          )}
          <span className="text-xs font-semibold">{tableName}</span>
        </div>
        {booked && <span className="text-teal-600">bam</span>}
      </div>
    </div>
  )
}

export type WorkTableProps = {
  tableName: number | string
  tableGroup: number | string | undefined
  rotate?: 0 | 90 | 180 | 270
  x?: number
  y?: number
  available?: boolean
  booked?: boolean
} & HTMLAttributes<HTMLDivElement>

export default WorkTable
