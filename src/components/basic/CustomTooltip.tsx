import clsx from 'clsx'
import { ITooltip, Tooltip } from 'react-tooltip'

const CustomTooltip = ({ children, className, ...props }: ITooltip) => {
  return (
    <Tooltip
      opacity={0.98}
      className={clsx(
        'absolute z-40 rounded-lg bg-white p-2 text-sm font-normal text-zinc-900 shadow-2xl *:[.react-tooltip-arrow]:hidden',
        className
      )}
      disableStyleInjection="core"
      border="1px rgb(0 0 0 / 0.07) solid"
      variant="light"
      {...props}
    >
      {children}
    </Tooltip>
  )
}

export default CustomTooltip
