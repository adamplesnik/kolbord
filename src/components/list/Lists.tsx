import { useQueryClient } from '@tanstack/react-query'
import { humanDate } from '../../utils/human'
import Heading from '../basic/Heading'
import { Value } from '../plan/PlanDateSelector'
import { PlanType } from '../plan/planType'
import Spaces from '../space/Spaces'

const Lists = ({ handlePlaceClick, planId, sidebarTableId, workingDate }: ListsProps) => {
  const queryClient = useQueryClient()
  const zone: { data: PlanType } | undefined = queryClient.getQueryData(['zone', planId])

  return (
    <div className="min-h-screen bg-slate-200/0">
      <div className="mx-auto flex max-w-5xl flex-col gap-1 p-8 pb-24">
        <div className="flex items-baseline gap-2 pb-8">
          <Heading size={3}>{zone && zone.data.name}</Heading>
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
