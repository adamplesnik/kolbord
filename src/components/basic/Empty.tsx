import { LucideIcon } from 'lucide-react'

const Empty = ({ Icon, message, additional }: EmptyProps) => {
  return (
    <div className="mx-auto flex min-h-52 max-w-sm flex-col items-center justify-center">
      <Icon className="size-12 pb-2 text-slate-500" strokeWidth={1.5} />
      <span className="text-lg font-medium text-slate-700">{message}</span>
      {additional && <span className="pt-2 text-sm text-slate-500">{additional}</span>}
    </div>
  )
}

type EmptyProps = {
  Icon: LucideIcon
  message: string
  additional?: string | undefined
}

export default Empty
