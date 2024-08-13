import { HTMLAttributes } from 'react'
import Logo from '../components/Logo'

const MenuBar = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="fixed bottom-2 left-2 z-50 flex items-center gap-1 rounded-xl bg-white/90 p-2 shadow-xl">
      <Logo />
      {children}
    </div>
  )
}

export default MenuBar
