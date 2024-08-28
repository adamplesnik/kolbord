import { HTMLAttributes } from 'react'
import { Tooltip } from 'react-tooltip'
import { addWithSpace } from '../../utils/addWithSpace'

const Badge = ({ children, className, dataTooltipContent, dataTooltipId }: BadgeProps) => {
  return (
    <div
      className={
        'flex items-center justify-center rounded border border-slate-400 text-slate-500' +
        addWithSpace(className)
      }
      data-tooltip-content={dataTooltipContent}
      data-tooltip-id={dataTooltipId}
    >
      {children}
      <Tooltip id={dataTooltipId} />
    </div>
  )
}

type BadgeProps = {
  dataTooltipContent?: string
  dataTooltipId?: string
} & HTMLAttributes<HTMLDivElement>

export default Badge
