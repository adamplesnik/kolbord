import { Check, ChevronsUpDown } from 'lucide-react'
import { useContext } from 'react'
import { useIsAdmin } from '../../hooks/useIsAdmin.ts'
import { EditModeContext, EditModeContextType } from '../../providers/EditModeContextProvider.tsx'
import { SidebarContext, SidebarContextType } from '../../providers/SidebarContextProvider.tsx'
import { ZoneContext, ZoneContextType } from '../../providers/ZoneContextProvider.tsx'
import Button from '../basic/Button'
import CustomTooltip from '../basic/CustomTooltip.tsx'
import Heading from '../basic/Heading.tsx'
import Loading from '../basic/Loading.tsx'
import Ping from '../basic/Ping'
import Skeleton from '../basic/Skeleton.tsx'
import GroupAdd from '../group/GroupAdd.tsx'
import GroupList from '../group/GroupList.tsx'
import SpaceAdd from '../space/SpaceAdd.tsx'
import PlanAdd from './PlanAdd.tsx'

const PlanSwitcher = () => {
  const { isAdmin } = useIsAdmin()
  const { editMode } = useContext(EditModeContext) as EditModeContextType
  const { setSidebarState } = useContext(SidebarContext) as SidebarContextType
  const { zone, setZone, zones, isLoading } = useContext(ZoneContext) as ZoneContextType

  return (
    <>
      <div data-tooltip-id="plansTooltip">
        <Button IconRight={ChevronsUpDown}>
          {zones && zones.length === 0 && (
            <div className="flex items-center gap-2 text-pink-600">
              Create new zone
              <Ping className="-mr-[1.6rem]" />
            </div>
          )}
          {isLoading && (
            <>
              <Loading />
              <Skeleton width="100px" />
            </>
          )}
          {zones &&
            zones.map((z) =>
              zone?.id === z.id ? <span key={`plan_in_switcher_${z.id}`}>{z.name}</span> : ''
            )}
        </Button>
      </div>
      <CustomTooltip id="plansTooltip" openOnClick clickable>
        <div className="flex gap-8">
          <div className="flex flex-col gap-2">
            <Heading size={4}>Zones</Heading>
            {zones &&
              zones.map((z) => (
                <div className="flex gap-1" key={`plan_${z.id}`}>
                  <Button
                    className="flex-1"
                    onClick={() => {
                      setZone(z)
                      setSidebarState({ group: undefined, space: undefined })
                    }}
                    active={zone?.id === z.id}
                    Icon={Check}
                    iconClassName={zone?.id === z.id ? 'opacity-100' : 'opacity-35'}
                  >
                    {z.name}
                  </Button>
                </div>
              ))}
            {isAdmin && editMode && <PlanAdd />}
            {zone?.id != undefined && zone?.id > 0 && editMode && <SpaceAdd planId={zone?.id} />}
          </div>
          {isAdmin && editMode && (
            <div className="flex flex-col gap-2">
              <Heading size={4}>Groups</Heading>
              <GroupList />
              {zone?.id != undefined && zone?.id > 0 && <GroupAdd />}
            </div>
          )}
        </div>
      </CustomTooltip>
    </>
  )
}

export default PlanSwitcher
