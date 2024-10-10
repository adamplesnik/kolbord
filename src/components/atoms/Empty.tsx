import { LucideIcon } from 'lucide-react'
import Heading from '../basic/Heading'

const Empty = ({ Icon, message, additional }: EmptyProps) => {
  return (
    <div className="mx-auto flex min-h-52 max-w-sm flex-col items-center justify-center">
      <Icon className="mb-4 size-10 shrink-0 text-zinc-500" strokeWidth={1.5} />
      <Heading size={3} className="text-center text-zinc-600">
        {message}
      </Heading>
      {additional && <span className="pt-6 text-center text-sm text-zinc-500">{additional}</span>}
    </div>
  )
}

type EmptyProps = {
  Icon: LucideIcon
  message: string
  additional?: string | undefined
}

export default Empty
