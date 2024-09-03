import Loading from '../basic/Loading'
import { usePlanQuery } from './loadPlan'

const Plan = ({ id }: PlanProps) => {
  const { data: plan, isLoading } = usePlanQuery(id)

  return (
    <>
      <Loading loading={isLoading} />
      {plan && plan.data.attributes.svg && (
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(plan.data.attributes.svg)}`}
          className="max-w-fit"
        />
      )}
    </>
  )
}

type PlanProps = {
  id: number
}

export default Plan
