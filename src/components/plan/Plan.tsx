import { useAuth } from '@clerk/clerk-react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect } from 'react'
import Loading from '../basic/Loading'
import { PlanType } from './planType'

const Plan = ({ zoneId }: PlanProps) => {
  const { getToken } = useAuth()
  const loadPlan = async (id: number): Promise<{ data: PlanType } | undefined> => {
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
    queryKey: ['zone'],
    enabled: zoneId > 0,
    queryFn: () => loadPlan(zoneId),
  })

  const queryClient = useQueryClient()
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['zone'] })
  }, [queryClient, zoneId])

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
