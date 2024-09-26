import { HTMLAttributes } from 'react'
import { addWithSpace } from '../../utils/addWithSpace'

const Paragraph = ({ children, className }: HTMLAttributes<HTMLParagraphElement>) => {
  return <p className={'pb-2 leading-relaxed' + addWithSpace(className)}>{children}</p>
}

export default Paragraph
