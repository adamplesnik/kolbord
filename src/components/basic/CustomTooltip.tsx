import clsx from 'clsx'
import { ITooltip, Tooltip } from 'react-tooltip'

const CustomTooltip = ({ children, className, ...props }: ITooltip) => {
  return (
    <Tooltip
      {...props}
      opacity={0.98}
      className={clsx(
        'absolute rounded-lg bg-white p-2 font-normal text-black shadow-lg *:[.react-tooltip-arrow]:hidden',
        className
      )}
      disableStyleInjection="core"
      border="1px var(--color-zinc-300) solid"
      variant="light"
    >
      {children}
    </Tooltip>
  )
}

export default CustomTooltip
