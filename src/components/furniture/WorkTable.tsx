import { UserRoundCheck } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { TableRecord } from '../../data/TableRecord'
import { Features } from '../../data/features'
import { addWithSpace } from '../../utils/addWithSpace'
import Chair from './atomic/Chair'

const WorkTable = ({
  name,
  group,
  rotation = 0,
  x = 0,
  y = 0,
  available = true,
  booked = false,
  features,
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

  const dimensionClasses: Record<number, string> = {
    16080: 'h-[78px] w-[158px]',
  }

  return (
    <div
      id={'table-' + (group ? group : '') + name}
      className={
        'absolute inline-flex size-[160px] flex-col items-center justify-between p-px pt-2' +
        addWithSpace(available ? 'group cursor-pointer' : 'opacity-30') +
        addWithSpace(rotationClasses[rotation] || '') +
        addWithSpace(className)
      }
      style={{ top: y, left: x }}
    >
      <Chair />
      <div
        className={
          'flex h-[78px] w-[158px] items-center justify-center rounded border border-black transition-colors' +
          addWithSpace(dimensionClasses[16080] || '') +
          addWithSpace(
            booked
              ? 'border-dashed bg-red-50 group-hover:bg-rose-50'
              : 'bg-zinc-200 group-hover:bg-slate-200'
          )
        }
      >
        <div
          className={
            'flex flex-col items-center justify-center gap-1 p-2' +
            addWithSpace(contraRotationClasses[rotation] || '')
          }
        >
          <span className="text-xs font-semibold">{name}</span>
          {features && (
            <div className="flex gap-0.5">
              {features.map((tableFeature) =>
                Features.map((f, i) =>
                  tableFeature == f.id ? (
                    <>
                      <f.Icon
                        size={18}
                        key={i}
                        aria-label={f.desc}
                        className="text-zinc-500"
                        strokeWidth={1}
                      />
                    </>
                  ) : (
                    ''
                  )
                )
              )}
            </div>
          )}
          {booked ? (
            <span className="text-neutral-800">
              <UserRoundCheck />
            </span>
          ) : (
            <span className="rounded-full bg-teal-600 py-1 px-2 text-sm text-white">
              Reserve...
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export type WorkTableProps = TableRecord & HTMLAttributes<HTMLDivElement>

export default WorkTable
