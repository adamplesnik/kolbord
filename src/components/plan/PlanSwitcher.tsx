import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Check, ChevronsUpDown, User } from 'lucide-react'
import { HTMLAttributes, useContext } from 'react'
import { useIsAdmin } from '../../auth/useIsAdmin.ts'
import { EditModeContext, EditModeContextType } from '../../context/EditModeContextProvider.tsx'
import { SidebarContext, SidebarContextType } from '../../context/SidebarContextProvider.tsx'
import { ZoneType } from '../../types/zoneType'
import Button from '../basic/Button'
import CustomTooltip from '../basic/CustomTooltip.tsx'
import Heading from '../basic/Heading.tsx'
import Ping from '../basic/Ping'
import GroupAdd from '../group/GroupAdd.tsx'
import GroupList from '../group/GroupList.tsx'
import SpaceAdd from '../space/SpaceAdd.tsx'
import PlanAdd from './PlanAdd.tsx'
import { useZone } from './useZone.ts'

const PlanSwitcher = ({ handleMyBookings }: PlanSwitcherProps) => {
  const { isAdmin } = useIsAdmin()
  const { editMode } = useContext(EditModeContext) as EditModeContextType
  const { setSidebarState } = useContext(SidebarContext) as SidebarContextType
  const { zoneId } = useZone()
  const { data: zones } = useQuery<{ data: { docs: ZoneType[] } }>({
    queryKey: ['zones'],
    enabled: true,
  })
  const queryClient = useQueryClient()

  return (
    <>
      <div data-tooltip-id="plansTooltip">
        <Button IconRight={ChevronsUpDown}>
          {zones && zones.data.docs.length === 0 && (
            <div className="flex items-center gap-2 text-pink-600">
              Create new plan
              <Ping className="-mr-[1.6rem]" />
            </div>
          )}
          {zones &&
            zones.data &&
            zones.data.docs.map((zone) =>
              zoneId === zone.id ? <span key={`plan_in_switcher_${zone.id}`}>{zone.name}</span> : ''
            )}
        </Button>
      </div>
      <CustomTooltip id="plansTooltip" openOnClick clickable>
        <div className="flex gap-8">
          <div className="flex flex-col gap-2">
            <Heading size={4}>Zones</Heading>
            {zones &&
              zones.data &&
              zones.data.docs.map((zone) => (
                <div className="flex gap-1" key={`plan_${zone.id}`}>
                  <Button
                    className="flex-1"
                    onClick={() => {
                      queryClient.setQueryData<{ data: ZoneType }>(['zone'], {
                        data: {
                          id: zone.id,
                        },
                      })
                      setSidebarState({ group: undefined, space: undefined })
                    }}
                    active={zoneId === zone.id}
                    Icon={Check}
                    iconClassName={zoneId === zone.id ? 'opacity-100' : 'opacity-35'}
                  >
                    {zone.name}
                  </Button>
                </div>
              ))}
            {isAdmin && <PlanAdd />}
            {zoneId != undefined && zoneId > 0 && <SpaceAdd planId={zoneId} />}
          </div>
          {isAdmin && editMode && (
            <div className="flex flex-col gap-2">
              <Heading size={4}>Groups</Heading>
              <GroupList />
              {zoneId != undefined && zoneId > 0 && <GroupAdd />}
            </div>
          )}
        </div>
        <Button onClick={handleMyBookings} className="w-full" Icon={User}>
          Your bookings
        </Button>
      </CustomTooltip>
    </>
  )
}

type PlanSwitcherProps = {
  handleMyBookings: () => void
} & HTMLAttributes<HTMLDivElement>

export default PlanSwitcher
