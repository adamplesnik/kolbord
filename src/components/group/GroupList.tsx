import EditButton from '../basic/EditButton'
import { useGroupsForPlanQuery } from './groupFetch'

const GroupList = ({ planId, onGroupEdit }: GroupListProps) => {
  const { data: groups } = useGroupsForPlanQuery(planId)

  return (
    <div className="flex flex-col gap-2">
      {groups?.data.map((group) => (
        <div className="flex items-center gap-1">
          <span className="flex-1">{group.attributes.name}</span>
          <EditButton onClick={() => onGroupEdit(group.id)} editMode={false} />
        </div>
      ))}
    </div>
  )
}

type GroupListProps = {
  onGroupEdit: (groupId: number) => void
  planId: number
}

export default GroupList
