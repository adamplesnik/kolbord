import { HTMLAttributes } from 'react'
import { addWithSpace } from '../utils/addWithSpace'

const Badge = ({ children, className }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={'rounded border border-slate-400 p-1 text-slate-500' + addWithSpace(className)}>
      {children}
    </div>
  )
}

export default Badge
