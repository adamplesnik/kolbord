import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Check, ChevronsUpDown, User } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { Tooltip } from 'react-tooltip'
import { GroupRecord } from '../../data/GroupRecord.tsx'
import Button from '../basic/Button'
import EditButton from '../basic/EditButton'
import Heading from '../basic/Heading.tsx'
import Ping from '../basic/Ping'
import GroupAdd from '../group/GroupAdd.tsx'
import GroupList from '../group/GroupList.tsx'
import SpaceAdd from '../space/SpaceAdd.tsx'
import { SpaceType } from '../space/spaceType'
import PlanAdd from './PlanAdd.tsx'
import { PlanType } from './planType'
import { useZone } from './useZone.ts'

const PlanSwitcher = ({
  handlePlaceAdd,
  handleMyBookings,
  onGroupEdit,
  onPlanEdit,
}: PlanSwitcherProps) => {
  const userCanEdit = true // @todo
  const { data: zones } = useQuery<{ data: { docs: PlanType[] } }>({
    queryKey: ['zones'],
    enabled: true,
  })

  const { zoneId } = useZone()
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
      <Tooltip id="plansTooltip" openOnClick clickable>
        <div className="flex gap-8">
          <div className="flex flex-col gap-2">
            <Heading size={4}>Zones</Heading>
            {zones &&
              zones.data &&
              zones.data.docs.map((zone) => (
                <div className="flex gap-1" key={`plan_${zone.id}`}>
                  <Button
                    className="flex-1"
                    onClick={() =>
                      queryClient.setQueryData<{ data: PlanType }>(['zone'], {
                        data: {
                          id: zone.id,
                        },
                      })
                    }
                    active={zoneId === zone.id}
                    Icon={Check}
                    iconClassName={zoneId === zone.id ? 'opacity-100' : 'opacity-35'}
                  >
                    {zone.name}
                  </Button>
                  {zoneId === zone.id && (
                    <EditButton onClick={() => onPlanEdit(zone.id)} editMode={false} />
                  )}
                </div>
              ))}
            {userCanEdit && <PlanAdd />}
            {zoneId != undefined && zoneId > 0 && (
              <SpaceAdd planId={zoneId} handlePlaceAdd={handlePlaceAdd} />
            )}
          </div>
          {userCanEdit && (
            <div className="flex flex-col gap-2">
              <Heading size={4}>Groups</Heading>
              <GroupList onGroupEdit={onGroupEdit} />
              {zoneId != undefined && zoneId > 0 && <GroupAdd />}
            </div>
          )}
        </div>
        <Button onClick={handleMyBookings} className="w-full" Icon={User}>
          Your bookings
        </Button>
      </Tooltip>
    </>
  )
}

type PlanSwitcherProps = {
  handleMyBookings: () => void
  handlePlaceAdd: (space: SpaceType) => void
  onGroupEdit: (group: GroupRecord) => void
  onPlanChange: (id: number | undefined) => void
  onPlanEdit: (planId: number | undefined) => void
} & HTMLAttributes<HTMLDivElement>

export default PlanSwitcher
