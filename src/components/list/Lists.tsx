import { useQueryClient } from '@tanstack/react-query'
import { PlanType, SpaceType } from '../../types/spaceType'
import { humanDate } from '../../utils/human'
import Heading from '../basic/Heading'
import { Value } from '../plan/PlanDateSelector'
import Spaces from '../space/Spaces'

const Lists = ({ handlePlaceClick, sidebarSpace, workingDate }: ListsProps) => {
  const queryClient = useQueryClient()
  const zone: { data: PlanType } | undefined = queryClient.getQueryData(['zone'])

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
          sidebarSpace={sidebarSpace}
        />
      </div>
    </div>
  )
}

type ListsProps = {
  handlePlaceClick: (space: SpaceType) => void
  listView: boolean
  sidebarSpace: SpaceType | undefined
  workingDate: Value
}

export default Lists
