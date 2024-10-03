import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { SidebarContext, SidebarContextType } from '../../context/SidebarContextProvider'
import { GroupType } from '../../types/groupType'
import Button from '../basic/Button'
import { useZone } from '../plan/useZone'

const GroupList = () => {
  const { zoneId } = useZone()
  const { setSidebarState } = useContext(SidebarContext) as SidebarContextType
  const { data } = useQuery<{ data: { docs: GroupType[] } }>({
    queryKey: ['groups', zoneId],
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
