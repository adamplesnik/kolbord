import { HTMLAttributes } from 'react'
import { Tooltip } from 'react-tooltip'
import { addWithSpace } from '../../utils/addWithSpace'

const GroupMarker = ({
  groupName,
  groupDescription,
  x,
  y,
  onClick,
  className,
}: GroupMarkerProps) => {
  return (
    <div
      className={
        'absolute z-50 rounded-lg border border-2 border-transparent bg-slate-600 py-1 px-4 text-sm font-medium text-white transition-colors' +
        addWithSpace(className)
      }
      style={{ left: x, top: y }}
      onClick={onClick}
      data-tooltip-id="1"
      data-tooltip-content={groupDescription}
    >
      {groupName}
      <Tooltip id="1" />
    </div>
  )
}

export type GroupMarkerProps = {
  groupName: string
  groupDescription: string
  x: number
  y: number
} & HTMLAttributes<HTMLDivElement>

export default GroupMarker
