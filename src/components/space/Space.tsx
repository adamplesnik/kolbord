import { useAuth } from '@clerk/clerk-react'
import clsx from 'clsx'
import { ArrowRight } from 'lucide-react'
import { useContext } from 'react'
import { SidebarContext, SidebarContextType } from '../../providers/SidebarContextProvider.tsx'
import { BookingType } from '../../types/bookingType'
import { SpaceType } from '../../types/spaceType'
import { humanTime } from '../../utils/human.ts'
import Button from '../basic/Button.tsx'
import CustomTooltip from '../basic/CustomTooltip.tsx'
import Separator from '../basic/Separator.tsx'
import UserName from '../user/UserName.tsx'
import SpaceDot from './SpaceDot.tsx'

const SpaceBookings = ({ bookings }: { bookings: BookingType[] }) => {
  return (
    <>
      {bookings?.map((b: BookingType, i: number) => (
        <div className="flex items-center gap-1" key={`${b.id}_${i}`}>
          <div className="flex w-28 items-center justify-evenly gap-1 text-slate-200">
            {humanTime(b.from)}
            <ArrowRight className="size-4 text-slate-400" strokeWidth={1} />
            {humanTime(b.to)}
          </div>
          <span className="font-semibold">
            <UserName subject={b.sub} />
          </span>
        </div>
      ))}
    </>
  )
}

const Space = ({ className, bookings, listView, space }: SpaceProps) => {
  const { userId } = useAuth()
  const { sidebarState, setSidebarState } = useContext(SidebarContext) as SidebarContextType
  const tooltipId = `bookingTooltip_${space.id}`
  const active = space === sidebarState.space
  const bookedToday = bookings && bookings?.length > 0
  const bookedByWho = bookings?.find((b) => b.sub === userId)?.sub
  const bookedByMe = bookedByWho === userId

  const setActive = () =>
    setSidebarState({
      title: space.name,
      space: space,
    })

  if (!listView) {
    return (
      <>
        <div
          id={`space_${space.id.toFixed()}`}
          onClick={setActive}
          data-tooltip-id={tooltipId}
          className={clsx(
            'group absolute cursor-pointer rounded-full p-2 ring transition-colors hover:z-50',
            active ?
              'z-40 bg-slate-700/50 ring-2 ring-slate-600 ring-offset-4 hover:ring-slate-800'
            : 'ring-4 ring-transparent hover:bg-slate-400/50 hover:ring-white',
            className
          )}
          style={{
            top: space.y,
            left: space.x,
          }}
        >
          <SpaceDot bookedByMe={bookedByMe} bookedByWho={bookedByWho} bookedToday={bookedToday} />
        </div>
        {bookings && bookings?.length > 0 && (
          <CustomTooltip id={tooltipId} className="z-10 text-sm">
            <SpaceBookings bookings={bookings} />
          </CustomTooltip>
        )}
      </>
    )
  } else {
    return (
      <>
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <div className="flex items-center gap-2">
            <div onClick={setActive}>
              <SpaceDot
                bookedByMe={bookedByMe}
                bookedByWho={bookedByWho}
                bookedToday={bookedToday}
                small
              />
            </div>
            <div className="flex-1 shrink-0 font-medium lg:w-48">
              <Button onClick={setActive}>{space.name}</Button>
            </div>
          </div>
          <div className="flex flex-wrap items-start gap-x-4 gap-y-1 text-sm">
            {bookings && bookings?.length > 0 && <SpaceBookings bookings={bookings} />}
          </div>
        </div>
        <Separator />
      </>
    )
  }
}

type SpaceProps = {
  space: SpaceType
  bookings?: BookingType[] | undefined
  className?: string | undefined
  listView: boolean
}

export default Space
