import { Value } from '../plan/PlanDateSelector'
import Spaces from '../space/Spaces'

const Lists = ({
  handlePlaceClick,
  planId,
  sidebarPlanEdit,
  sidebarTableId,
  workingDate,
}: ListsProps) => {
  return (
    <div>
      <Spaces
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
