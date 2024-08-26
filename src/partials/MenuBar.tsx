import { HTMLAttributes } from 'react'
import Logo from '../components/Logo'

const MenuBar = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="bg-sidebar fixed bottom-2 left-2 z-50 flex items-center gap-3 rounded-xl border border-slate-200/30 border-r-transparent border-l-pink-300/30 bg-white/50 py-2 px-4 shadow-2xl backdrop-blur-md">
      <Logo className="h-5" />
      {children}
    </div>
  )
}

export default MenuBar
