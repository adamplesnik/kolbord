import { useQuery } from '@tanstack/react-query'
import { GroupRecord } from '../../data/GroupRecord'
import EditButton from '../basic/EditButton'
import { useZone } from '../plan/useZone'

const GroupList = ({ onGroupEdit }: GroupListProps) => {
  const { zoneId } = useZone()
  const { data } = useQuery<{ data: { docs: GroupRecord[] } }>({
    queryKey: ['groups', zoneId],
    enabled: true,
  })

  return (
    <div className="flex flex-col gap-2">
      {data?.data.docs.map((group) => (
        <div className="flex items-center gap-1">
          <span className="flex-1">{group.name}</span>
          <EditButton onClick={() => onGroupEdit(group.id)} editMode={false} />
        </div>
      ))}
    </div>
  )
}

type GroupListProps = {
  onGroupEdit: (groupId: number) => void
}

export default GroupList
