import { HTMLAttributes } from 'react'
import { addWithSpace } from '../../utils/addWithSpace'

const P = ({ children, small = false, className }: PProps) => {
  return (
    <p
      className={
        (small ? 'pb-3 text-sm text-slate-600' : 'pb-4 leading-relaxed') + addWithSpace(className)
      }
    >
      {children}
    </p>
  )
}

type PProps = {
  small?: boolean
} & HTMLAttributes<HTMLParagraphElement>
export default P
