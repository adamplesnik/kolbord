import Places from '../place/Places'
import { Value } from '../plan/PlanDateSelector'

const Lists = ({
  handlePlaceClick,
  planId,
  sidebarPlanEdit,
  sidebarTableId,
  workingDate,
}: ListsProps) => {
  return (
    <div>
      <Places
        listView={true}
        handlePlaceClick={handlePlaceClick}
        workingDate={workingDate}
        planId={planId}
        sidebarTableId={sidebarTableId}
      />
    </div>
  )
}

type ListsProps = {
  handlePlaceClick: (id: number) => void
  listView: boolean
  planId: number
  sidebarPlanEdit: boolean
  sidebarTableId: number
  workingDate: Value
}

export default Lists
