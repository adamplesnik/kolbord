import { HTMLAttributes } from 'react'
import { addWithSpace } from '../../utils/addWithSpace'
import CustomTooltip from '../basic/CustomTooltip'

const GroupMarker = ({ groupName, groupDescription, x, y, className }: GroupMarkerProps) => {
  const tooltipId = `${x}_${y}_marker`
  return (
    <div
      className={
        'absolute z-50 rounded-lg border border-2 border-transparent bg-slate-600 py-0.5 px-1 text-xs font-medium text-white transition-colors' +
        addWithSpace(className)
      }
      style={{ left: x, top: y }}
      data-tooltip-id={tooltipId}
    >
      {groupName}
      <CustomTooltip id={tooltipId}>
        <span className="text-sm">{groupDescription}</span>
      </CustomTooltip>
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
