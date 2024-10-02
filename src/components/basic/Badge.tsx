import { HTMLAttributes } from 'react'
import { addWithSpace } from '../../utils/addWithSpace'
import CustomTooltip from './CustomTooltip'

const Badge = ({
  children,
  className,
  dataTooltipContent,
  dataTooltipId,
  ...props
}: BadgeProps) => {
  return (
    <div
      className={
        'flex h-8 items-center justify-center rounded bg-slate-100 px-1 text-sm text-slate-600' +
        addWithSpace(className)
      }
      data-tooltip-content={dataTooltipContent}
      data-tooltip-id={dataTooltipId}
      {...props}
    >
      {children}
      <CustomTooltip id={dataTooltipId} className="z-20" />
    </div>
  )
}

type BadgeProps = {
  dataTooltipContent?: string
  dataTooltipId?: string
} & HTMLAttributes<HTMLDivElement>

export default Badge
