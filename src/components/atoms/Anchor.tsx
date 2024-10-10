import clsx from 'clsx'
import { Link, LinkProps } from 'react-router-dom'

const Anchor = ({ to, target, children, className }: LinkProps) => {
  return (
    <Link
      to={to}
      target={target}
      className={clsx(
        'hover:text-underline cursor-pointer text-current underline-offset-1 hover:underline',
        className
      )}
    >
      {children}
    </Link>
  )
}

export default Anchor
