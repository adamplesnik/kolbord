import { HTMLAttributes } from 'react'
import { Tooltip } from 'react-tooltip'
import { addWithSpace } from '../../utils/addWithSpace'

const Badge = ({ children, className, dataTooltipContent, dataTooltipId }: BadgeProps) => {
  return (
    <div
      className={
        'flex h-8 items-center justify-center rounded border border-slate-400 px-1 text-sm text-slate-600' +
        addWithSpace(className)
      }
      data-tooltip-content={dataTooltipContent}
      data-tooltip-id={dataTooltipId}
    >
      {children}
      <Tooltip id={dataTooltipId} className="z-20" />
    </div>
  )
}

type BadgeProps = {
  dataTooltipContent?: string
  dataTooltipId?: string
} & HTMLAttributes<HTMLDivElement>

export default Badge
