import { HTMLAttributes } from 'react'

const GroupMarker = ({ groupName, x, y }: GroupMarkerProps) => {
  return (
    <div
      className="absolute z-50 rounded-lg border bg-zinc-600 py-1 px-4 font-medium text-white"
      style={{ left: x, top: y }}
    >
      {groupName}
    </div>
  )
}

export type GroupMarkerProps = {
  groupName: string
  x: number
  y: number
} & HTMLAttributes<HTMLDivElement>

export default GroupMarker
