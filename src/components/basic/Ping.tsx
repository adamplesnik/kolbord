import { HTMLAttributes } from 'react'
import { addWithSpace } from '../../utils/addWithSpace'

const Ping = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={
        'pointer-events-none size-4 animate-ping rounded-full bg-pink-600 opacity-70 [animation-iteration-count:10]' +
        addWithSpace(className)
      }
    ></div>
  )
}

export default Ping
