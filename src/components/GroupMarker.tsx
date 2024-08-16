import { HTMLAttributes } from 'react'
import { Tooltip } from 'react-tooltip'

const GroupMarker = ({ groupName, groupDescription, x, y, onClick }: GroupMarkerProps) => {
  return (
    <div
      className="absolute z-50 rounded-lg border bg-zinc-600 py-1 px-4 font-medium text-white"
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
