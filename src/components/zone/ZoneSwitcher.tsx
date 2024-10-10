import { Check } from 'lucide-react'
import { useContext } from 'react'
import { useIsAdmin } from '../../hooks/useIsAdmin.ts'
import { EditModeContext, EditModeContextType } from '../../providers/EditModeContextProvider.tsx'
import { SidebarContext, SidebarContextType } from '../../providers/SidebarContextProvider.tsx'
import { ZoneContext, ZoneContextType } from '../../providers/ZoneContextProvider.tsx'
import Button from '../atoms/Button.tsx'
import Heading from '../atoms/Heading.tsx'
import Loading from '../atoms/Loading.tsx'
import Skeleton from '../atoms/Skeleton.tsx'
import CustomTooltip from '../basic/CustomTooltip.tsx'
import Ping from '../basic/Ping.tsx'
import GroupAdd from '../group/GroupAdd.tsx'
import GroupList from '../group/GroupList.tsx'
import SpaceAdd from '../space/SpaceAdd.tsx'
import ZoneAdd from './ZoneAdd.tsx'

const ZoneSwitcher = () => {
  const { isAdmin } = useIsAdmin()
  const { editMode } = useContext(EditModeContext) as EditModeContextType
  const { setSidebarState } = useContext(SidebarContext) as SidebarContextType
  const { zone, setZone, zones, isLoading } = useContext(ZoneContext) as ZoneContextType

  return (
    <>
      <Button data-tooltip-id="plansTooltip" buttonType="menu">
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
        {zone && <span className="font-medium">{zone.name}</span>}
      </Button>
      <CustomTooltip id="plansTooltip" openOnClick clickable>
        <div className="flex gap-8">
          <div className="flex flex-col gap-2">
            <Heading size={4}>Zones</Heading>
            {zones &&
              zones.map((z) => (
                <Button
                  key={`plan_${z.id}`}
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
              ))}
            <ZoneAdd />
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

export default ZoneSwitcher
