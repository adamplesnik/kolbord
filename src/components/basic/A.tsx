import { Link, LinkProps } from 'react-router-dom'
import { addWithSpace } from '../../utils/addWithSpace'

const A = ({ to, target, children, className, mono = false }: AProps) => {
  return (
    <Link
      to={to}
      target={target}
      className={
        'cursor-pointer underline-offset-1 hover:text-sky-500 hover:underline' +
        addWithSpace(mono ? 'text-slate-700' : 'text-sky-700') +
        addWithSpace(className)
      }
    >
      {children}
    </Link>
  )
}

type AProps = {
  mono?: boolean
} & LinkProps

export default A
