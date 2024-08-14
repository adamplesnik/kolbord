import { useQuery } from '@tanstack/react-query'
import { PlanRecord } from '../data/PlanRecord'
import Loading from './Loading'
import { getToken } from '../auth/helpers'

const Plan = ({ id = -1 }) => {
  type PlanQueryType = {
    data: PlanRecord
  }

  const loadPlan = async (id: number): Promise<PlanQueryType> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/plans/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    return response.json()
  }

  const { data: plan } = useQuery({
    queryKey: ['plan'],
    queryFn: () => loadPlan(id),
  })

  return (
    <>
      <Loading loading={false} />
      {plan && (
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(plan.data.attributes.svg)}`}
          className="max-w-fit"
        />
      )}
    </>
  )
}

export default Plan
