import { HTMLAttributes } from 'react'
import { addWithSpace } from '../../../utils/addWithSpace'

const Chair = ({ isBooked = false }: ChairProps) => {
  return (
    <div className="flex h-[50px] w-[40px] flex-col items-center justify-between self-center">
      <div
        className={
          'h-[4px] w-[36px] rounded border border-black bg-zinc-100 transition-colors group-hover:bg-zinc-200' +
          addWithSpace(isBooked ? 'border-dashed' : '')
        }
      ></div>
      <div
        className={
          'size-[40px] rounded border border-black bg-zinc-100 transition-colors group-hover:bg-zinc-200' +
          addWithSpace(isBooked ? 'border-dashed' : '')
        }
      ></div>
    </div>
  )
}

export type ChairProps = {
  isBooked?: boolean | undefined | ''
} & HTMLAttributes<HTMLDivElement>

export default Chair
