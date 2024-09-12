import { humanDate } from '../../utils/human'
import Heading from '../basic/Heading'
import { usePlanQuery } from '../plan/loadPlan'
import { Value } from '../plan/PlanDateSelector'
import Spaces from '../space/Spaces'

const Lists = ({ handlePlaceClick, planId, sidebarTableId, workingDate }: ListsProps) => {
  const { data: plan } = usePlanQuery(planId)
  return (
    <div className="min-h-screen bg-slate-200/0">
      <div className="mx-auto flex max-w-5xl flex-col gap-1 p-8 pb-24">
        <div className="flex items-baseline gap-2">
          <Heading size={3} className="pb-8">
            {plan?.data.attributes.name}
          </Heading>
          {workingDate && humanDate(new Date(Date.parse(workingDate.toString())))}
        </div>
        <Spaces
          listView={true}
          handlePlaceClick={handlePlaceClick}
          workingDate={workingDate}
          planId={planId}
          sidebarTableId={sidebarTableId}
        />
      </div>
    </div>
  )
}

type ListsProps = {
  handlePlaceClick: (id: number) => void
  listView: boolean
  planId: number

  sidebarTableId: number
  workingDate: Value
}

export default Lists
