import { Link, LinkProps } from 'react-router-dom'
import { addWithSpace } from '../../utils/addWithSpace'

const Anchor = ({ to, target, children, className }: LinkProps) => {
  return (
    <Link
      to={to}
      target={target}
      className={
        'hover:text-underline cursor-pointer text-current underline-offset-1 hover:underline' +
        addWithSpace(className)
      }
    >
      {children}
    </Link>
  )
}

export default Anchor
