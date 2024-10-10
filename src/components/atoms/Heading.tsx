import clsx from 'clsx'
import { HTMLAttributes } from 'react'

const Heading = ({ size = 1, children, className }: HeadingProps) => {
  if (size === 1) {
    return <h1 className={clsx('text-3xl font-semibold leading-snug', className)}>{children}</h1>
  } else if (size === 2) {
    return <h2 className={clsx('text-2xl font-semibold leading-snug', className)}>{children}</h2>
  } else if (size === 3) {
    return <h3 className={clsx('text-xl font-medium md:text-2xl', className)}>{children}</h3>
  } else if (size === 4) {
    return <h4 className={clsx('font-semibold', className)}>{children}</h4>
  }
}

type HeadingProps = {
  size: 1 | 2 | 3 | 4
} & HTMLAttributes<HTMLHeadingElement>

export default Heading
