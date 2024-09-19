import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Loading from '../basic/Loading'
import { PlanRecord } from '../../data/PlanRecord'

const Plan = ({ zoneId }: PlanProps) => {
  const { getToken } = useAuth()
  const loadPlan = async (id: number): Promise<{ data: PlanRecord } | undefined> => {
    try {
      return axios(`${import.meta.env.VITE_API_PAYLOAD_URL}/zones/${id}`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error(error)
    }
  }
  const { data: zone, isLoading } = useQuery({
    queryKey: ['plan', zoneId],
    enabled: zoneId > 0,
    queryFn: () => loadPlan(zoneId),
  })

  return (
    <>
      <Loading loading={isLoading} />
      {zone && zone.data && zone.data.svg && (
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(zone.data.svg)}`}
          className="max-w-fit"
        />
      )}
    </>
  )
}

type PlanProps = {
  zoneId: number
}

export default Plan
