import clsx from 'clsx'
import { HTMLAttributes } from 'react'

const Separator = ({ vertical: horizontal = false, className }: SeparatorProps) => {
  if (horizontal) {
    return <div className={clsx('w-px shrink-0 bg-black/5 last:hidden', className)}></div>
  } else {
    return <div className={clsx('h-px w-full bg-black/5 last:hidden', className)}></div>
  }
}

type SeparatorProps = {
  vertical?: boolean
} & HTMLAttributes<HTMLDivElement>

export default Separator
