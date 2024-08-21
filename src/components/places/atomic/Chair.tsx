import { HTMLAttributes } from 'react'
import { addWithSpace } from '../../../utils/addWithSpace'

const Chair = ({ isBooked = false }: ChairProps) => {
  return (
    <div
      className={
        'size-[40px] rounded-lg border border-black bg-zinc-100 transition-colors group-hover:bg-zinc-200' +
        addWithSpace(isBooked ? 'border-dashed' : '')
      }
    ></div>
  )
}

export type ChairProps = {
  isBooked?: boolean | undefined | ''
} & HTMLAttributes<HTMLDivElement>

export default Chair
