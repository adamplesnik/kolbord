import { HTMLAttributes, ReactNode } from 'react'
import { Tooltip } from 'react-tooltip'
import { addWithSpace } from '../../utils/addWithSpace'

const Em = ({ children, tooltipContent = undefined, tooltipId = undefined }: EmProps) => {
  return (
    <>
      <span
        className={
          'rounded border-b border-b-pink-300/20 bg-pink-100 px-0.5' +
          addWithSpace(tooltipId ? 'cursor-help' : '')
        }
        data-tooltip-id={tooltipId}
      >
        {children}
      </span>
      {tooltipId && (
        <Tooltip id={tooltipId} className="text-md font-normal">
          {tooltipContent}
        </Tooltip>
      )}
    </>
  )
}

type EmProps = {
  tooltipContent?: ReactNode | undefined
  tooltipId?: string | undefined
} & HTMLAttributes<HTMLSpanElement>

export default Em
