import Loading from '../basic/Loading'
import { usePlanQuery } from './planFetch'

const Plan = ({ planId }: PlanProps) => {
  const { data: plan, isLoading } = usePlanQuery(planId)

  return (
    <>
      <Loading loading={isLoading} />
      {plan && plan.data && plan.data.attributes.svg && (
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(plan.data.attributes.svg)}`}
          className="max-w-fit"
        />
      )}
    </>
  )
}

type PlanProps = {
  planId: number
}

export default Plan
