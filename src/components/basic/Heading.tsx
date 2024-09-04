import { HTMLAttributes } from 'react'
import { addWithSpace } from '../../utils/addWithSpace'

const Heading = ({ size = 1, children, className }: HeadingProps) => {
  if (size === 1) {
    return (
      <h1 className={'text-4xl font-semibold leading-snug md:text-5xl' + addWithSpace(className)}>
        {children}
      </h1>
    )
  } else if (size === 2) {
    return (
      <h2 className={'text-3xl font-semibold leading-snug md:text-4xl' + addWithSpace(className)}>
        {children}
      </h2>
    )
  } else if (size === 3) {
    return (
      <h3 className={'text-xl font-bold leading-snug md:text-2xl' + addWithSpace(className)}>
        {children}
      </h3>
    )
  } else if (size === 4) {
    return <h4 className={'text-md' + addWithSpace(className)}>{children}</h4>
  }
}

type HeadingProps = {
  size: 1 | 2 | 3 | 4
} & HTMLAttributes<HTMLHeadingElement>

export default Heading
