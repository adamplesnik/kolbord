import clsx from 'clsx'
import { HTMLAttributes } from 'react'

const Paragraph = ({ children, className }: HTMLAttributes<HTMLParagraphElement>) => {
  return <p className={clsx('pb-2 leading-relaxed', className)}>{children}</p>
}

export default Paragraph
