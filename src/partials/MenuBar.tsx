import { HTMLAttributes } from 'react'
import Logo from '../components/Logo'
import { addWithSpace } from '../utils/addWithSpace'

const MenuBar = ({ children, logo = false, position }: MenuBarProps) => {
  return (
    <div
      className={
        'fixed left-2 z-50 flex items-center gap-3 rounded-xl border border-slate-200/30 border-r-transparent border-l-pink-300/30 bg-white/95 p-2 shadow-2xl' +
        addWithSpace(position === 'top' && 'top-2') +
        addWithSpace(position === 'bottom' && 'bottom-2')
      }
    >
      {logo && <Logo className="h-5" />}
      {children}
    </div>
  )
}

type MenuBarProps = {
  position: 'top' | 'bottom'
  logo?: boolean
} & HTMLAttributes<HTMLDivElement>

export default MenuBar
