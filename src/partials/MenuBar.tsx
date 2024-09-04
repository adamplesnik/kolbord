import { HTMLAttributes } from 'react'
import Logo from '../components/Logo'

const MenuBar = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="fixed bottom-2 left-2 z-50 flex items-center gap-3 rounded-xl border border-slate-200/30 border-r-transparent border-l-pink-300/30 bg-white/95 p-2 shadow-2xl">
      <Logo className="h-5" />
      {children}
    </div>
  )
}

export default MenuBar
