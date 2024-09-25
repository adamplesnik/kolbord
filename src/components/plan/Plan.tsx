import { useAuth } from '@clerk/clerk-react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import qs from 'qs'
import { useEffect, useState } from 'react'
import { LATEST_PLAN_ID } from '../../utils/constants'
import Loading from '../basic/Loading'
import { PlanType } from './planType'
import { useZone } from './useZone'

const Plan = () => {
  const { getToken } = useAuth()
  const { zoneId } = useZone()
  const queryClient = useQueryClient()

  const [id, setId] = useState<number | undefined>(undefined)
  const savedZoneId = Number(localStorage.getItem(LATEST_PLAN_ID))

  const loadZones = async (): Promise<{ data: { docs: PlanType[] } } | undefined> => {
    const query = qs.stringify({
      sort: 'id',
    })
    return axios(`${import.meta.env.VITE_API_PAYLOAD_URL}/zones?${query}`, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        'Content-Type': 'application/json',
      },
    })
  }

  const { data: zones, isLoading } = useQuery({
    queryKey: ['zones'],
    queryFn: loadZones,
  })

  const loadZone = async (zoneId: number): Promise<{ data: PlanType } | undefined> => {
    return axios(`${import.meta.env.VITE_API_PAYLOAD_URL}/zones/${zoneId}`, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        'Content-Type': 'application/json',
      },
    })
  }

  const { data: zone } = useQuery({
    queryKey: ['zone'],
    enabled: !!id,
    queryFn: () => loadZone(id!),
  })

  useEffect(() => {
    if (zoneId) {
      setId(zoneId)
      console.log('zoneId from useZone used')
    } else if (savedZoneId > 0) {
      setId(savedZoneId)
      console.log('savedZoneId from local storage used')
    } else if (zones?.data?.docs && zones.data.docs.length > 0) {
      setId(zones.data.docs[0].id)
      console.log('first zoneId from zones data used')
    }
  }, [zoneId, savedZoneId, zones?.data?.docs])

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

export default Plan
