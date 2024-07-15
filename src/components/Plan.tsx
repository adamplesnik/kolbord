import { useQuery } from '@tanstack/react-query'
import { loadPlan } from '../utils/fetchApi'
import Loading from './Loading'

const Plan = ({ id = -1 }) => {
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
      ))
    </>
  )
}

export default Plan
