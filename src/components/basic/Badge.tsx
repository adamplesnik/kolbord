import clsx from 'clsx'
import { HTMLAttributes } from 'react'
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
      className={clsx(
        'flex h-8 items-center justify-center rounded bg-zinc-100 px-1 text-sm text-zinc-600',
        className
      )}
      data-tooltip-content={dataTooltipContent}
      data-tooltip-id={dataTooltipId}
      {...props}
    >
      {children}
      <CustomTooltip id={dataTooltipId} />
    </div>
  )
}

type BadgeProps = {
  dataTooltipContent?: string
  dataTooltipId?: string
} & HTMLAttributes<HTMLDivElement>

export default Badge
