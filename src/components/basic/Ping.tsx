import clsx from 'clsx'
import { HTMLAttributes } from 'react'

const Ping = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={clsx(
        'pointer-events-none size-4 animate-ping rounded-full bg-pink-600 opacity-70 [animation-iteration-count:10]',
        className
      )}
    ></div>
  )
}

export default Ping
