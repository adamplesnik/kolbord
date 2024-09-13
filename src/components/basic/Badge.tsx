import { HTMLAttributes } from 'react'
import { Tooltip } from 'react-tooltip'
import { addWithSpace } from '../../utils/addWithSpace'

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
        'flex h-8 items-center justify-center rounded bg-slate-50 px-1 text-sm text-slate-500' +
        addWithSpace(className)
      }
      data-tooltip-content={dataTooltipContent}
      data-tooltip-id={dataTooltipId}
      {...props}
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
