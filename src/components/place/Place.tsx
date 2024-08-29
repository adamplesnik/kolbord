import { MouseEventHandler } from 'react'
import { TableRecord } from '../../data/TableRecord'
import { addWithSpace } from '../../utils/addWithSpace'

import { PlaceFeatures } from './PlaceFeatures'
import PlaceRectangle from './PlaceRectangle'

const Place = ({
  active,
  className,
  attributes: { available, features, height, name, rotation, rounded, width, x, y, chairs },
  onClick,
  bookedToday = false,
  editMode,
}: PlaceProps) => {
  const bookedWho = 'ff'

  const hasChairs = chairs > 0 && chairs

  return (
    <div
      onClick={onClick}
      className={
        'absolute inline-flex size-[160px] flex-col items-center justify-between rounded-xl p-px ring-4 transition-colors' +
        addWithSpace(hasChairs && 'pt-2') +
        addWithSpace(available ? 'group cursor-pointer hover:ring-slate-300' : 'opacity-40') +
        addWithSpace(
          active && !editMode
            ? 'z-40 bg-slate-700 ring-slate-700 ring-offset-4 hover:ring-slate-800'
            : 'ring-transparent'
        ) +
        addWithSpace(editMode && active ? 'bg-red-600 ring-transparent' : '') +
        addWithSpace(className)
      }
      style={{
        top: y,
        left: x,
        width: width,
        height: hasChairs ? height + 64 : height,
        rotate: `${rotation}deg`,
      }}
    >
      {bookedToday && available && (
        <div className="absolute inset-2">
          <div
            className="inline-block rounded-full bg-slate-800 p-2 text-xl text-white"
            style={{ rotate: `${rotation * -1}deg` }}
          >
            {bookedWho}
          </div>
        </div>
      )}
      {hasChairs && (
        <PlaceRectangle
          isBooked={bookedToday && available}
          height={40}
          width={40}
          className="rounded-xl"
        />
      )}
      <PlaceRectangle
        isBooked={bookedToday && available}
        height={height}
        width={width}
        className={rounded ? 'rounded-full' : 'rounded-xl'}
      >
        <div className="flex flex-col items-center gap-1" style={{ rotate: `${rotation * -1}deg` }}>
          <div className="flex items-center gap-2">
            <span className={'text-md font-semibold'}>{name}</span>
          </div>
          {features && <PlaceFeatures features={features?.data} className="max-w-[78px]" />}
        </div>
      </PlaceRectangle>
    </div>
  )
}

export type PlaceProps = {
  active?: boolean | undefined
  onClick?: MouseEventHandler<HTMLDivElement> | undefined
  className?: string | undefined
  bookedToday?: boolean
  editMode: boolean
} & TableRecord

export default Place
