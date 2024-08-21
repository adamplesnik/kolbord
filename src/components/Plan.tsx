import { useQuery } from '@tanstack/react-query'
import { PlanRecord } from '../data/PlanRecord'
import Loading from './Loading'
import { getToken } from '../auth/helpers'

const Plan = ({ uuid }: PlanProps) => {
  type PlanQueryType = {
    data: PlanRecord[]
  }

  const loadPlan = async (uuid: string): Promise<PlanQueryType> => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/plans?filters[uuid][$eq]=${uuid}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    return response.json()
  }

  const { data: plan, isLoading } = useQuery({
    queryKey: ['plan', uuid],
    enabled: uuid != '',
    queryFn: () => loadPlan(uuid),
  })

  return (
    <>
      <Loading loading={isLoading} />
      {plan &&
        plan.data.map((p) => (
          <img
            src={`data:image/svg+xml;utf8,${encodeURIComponent(p.attributes.svg)}`}
            className="max-w-fit"
          />
        ))}
    </>
  )
}

type PlanProps = {
  uuid: string
}

export default Plan
