import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { SidebarContext, SidebarContextType } from '../../providers/SidebarContextProvider'
import { ZoneContext, ZoneContextType } from '../../providers/ZoneContextProvider'
import { GroupType } from '../../types/groupType'
import Button from '../atoms/Button'

const GroupList = () => {
  const { setSidebarState } = useContext(SidebarContext) as SidebarContextType
  const { zone } = useContext(ZoneContext) as ZoneContextType
  const { data } = useQuery<{ data: { docs: GroupType[] } }>({
    queryKey: ['groups', zone?.id],
    enabled: true,
  })

  return (
    <div className="flex flex-col gap-2">
      {data?.data.docs.map((group) => (
        <Button
          className="flex items-center gap-1"
          onClick={() => setSidebarState({ title: group.name, group: group })}
        >
          <span className="flex-1">{group.name}</span>
        </Button>
      ))}
    </div>
  )
}

export default GroupList
