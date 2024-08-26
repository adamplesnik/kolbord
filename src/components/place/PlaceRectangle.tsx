import { HTMLAttributes } from 'react'
import { addWithSpace } from '../../utils/addWithSpace'

const PlaceRectangle = ({ isBooked, children, className, height, width }: PlaceRectangleProps) => {
  return (
    <div
      className={
        'flex items-center justify-center border transition-colors' +
        addWithSpace(
          isBooked
            ? 'border-2 border-dashed border-red-400 bg-pink-50 group-hover:bg-pink-100'
            : 'border-black bg-neutral-100 group-hover:bg-neutral-200'
        ) +
        addWithSpace(className)
      }
      style={{ height: height - 2, width: width - 2 }}
    >
      {children}
    </div>
  )
}

export type PlaceRectangleProps = {
  height: number
  width: number
  isBooked?: boolean | undefined | ''
} & HTMLAttributes<HTMLDivElement>

export default PlaceRectangle
