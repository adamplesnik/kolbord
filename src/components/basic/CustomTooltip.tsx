import { ITooltip, Tooltip } from 'react-tooltip'
import { addWithSpace } from '../../utils/addWithSpace'

const CustomTooltip = ({ children, className, ...props }: ITooltip) => {
  return (
    <Tooltip
      {...props}
      opacity={0.98}
      className={'!rounded-lg font-normal shadow-lg' + addWithSpace(className)}
      disableStyleInjection="core"
      border="1px var(--color-zinc-300) solid"
      variant="light"
    >
      {children}
    </Tooltip>
  )
}

export default CustomTooltip
