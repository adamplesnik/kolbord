import { useAuth } from '@clerk/clerk-react'
import clsx from 'clsx'
import { useContext } from 'react'
import { SidebarContext, SidebarContextType } from '../../providers/SidebarContextProvider.tsx'
import { BookingType } from '../../types/bookingType'
import { SpaceType } from '../../types/spaceType'
import Button from '../atoms/Button.tsx'
import Separator from '../atoms/Separator.tsx'
import CustomTooltip from '../basic/CustomTooltip.tsx'
import SpaceBookings from './SpaceBookings.tsx'
import SpaceDot from './SpaceDot.tsx'

const Space = ({ className, bookings, listView, space }: SpaceProps) => {
  const { userId } = useAuth()
  const { sidebarState, setSidebarState } = useContext(SidebarContext) as SidebarContextType
  const tooltipId = `bookingTooltip_${space.id}`
  const active = space === sidebarState.space
  const bookedToday = bookings && bookings?.length > 0
  const bookedByWho = bookings?.find((b) => b.sub === userId)?.sub
  const bookedByMe = bookedByWho === userId

  const toggleActive = () => {
    if (active) {
      setSidebarState({
        title: undefined,
        space: undefined,
      })
    } else {
      setSidebarState({
        title: space.name,
        space: space,
      })
    }
  }

  if (!listView) {
    return (
      <>
        <div
          id={`space_${space.id.toFixed()}`}
          onClick={toggleActive}
          data-tooltip-id={tooltipId}
          className={clsx(
            'group absolute cursor-pointer rounded-full p-2 ring transition-colors hover:z-50',
            active ?
              'z-40 bg-zinc-700/50 ring-2 ring-zinc-600 ring-offset-4 hover:ring-zinc-800'
            : 'ring-4 ring-transparent hover:bg-zinc-400/50 hover:ring-white',
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
          <CustomTooltip id={tooltipId} children={<SpaceBookings bookings={bookings} />} />
        )}
      </>
    )
  } else {
    return (
      <>
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <div className="flex items-center gap-2">
            <div onClick={toggleActive}>
              <SpaceDot
                bookedByMe={bookedByMe}
                bookedByWho={bookedByWho}
                bookedToday={bookedToday}
                small
              />
            </div>
            <div className="flex-1 shrink-0 font-medium lg:w-48">
              <Button onClick={toggleActive}>{space.name}</Button>
            </div>
          </div>
          <div className="flex flex-wrap items-start gap-x-4 gap-y-1 pl-8 text-sm md:pl-0">
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
