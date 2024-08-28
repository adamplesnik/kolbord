import { Link, LinkProps } from 'react-router-dom'
import { addWithSpace } from '../../utils/addWithSpace'

const A = ({ to, target, children, className }: AProps) => {
  return (
    <Link
      to={to}
      target={target}
      className={'cursor-pointer text-cyan-600 hover:text-cyan-800' + addWithSpace(className)}
    >
      {children}
    </Link>
  )
}

type AProps = {} & LinkProps

export default A
