import { useAuth } from '@clerk/clerk-react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import qs from 'qs'
import { useEffect } from 'react'
import { ZoneType } from '../../types/zoneType'
import { LATEST_PLAN_ID } from '../../utils/constants'
import Loading from '../basic/Loading'
import { useZone } from './useZone'

const Plan = () => {
  const { getToken } = useAuth()
  const { zoneId } = useZone()
  const queryClient = useQueryClient()
  const savedZoneId = Number(localStorage.getItem(LATEST_PLAN_ID))

  const loadZones = async (): Promise<{ data: { docs: ZoneType[] } } | undefined> => {
    const query = qs.stringify({
      sort: 'id',
    })
    return axios(`${import.meta.env.VITE_API_URL}/zones?${query}`, {
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

  const loadZone = async (): Promise<{ data: ZoneType } | undefined> => {
    return axios.get(`${import.meta.env.VITE_API_URL}/zones/${zoneId}`, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        'Content-Type': 'application/json',
      },
    })
  }

  const { data: zone } = useQuery({
    queryKey: ['zone'],
    enabled: zoneId != undefined,
    queryFn: loadZone,
  })

  useEffect(() => {
    if (!zoneId) {
      queryClient.setQueryData<{ data: ZoneType }>(['zone'], {
        data: { id: savedZoneId || zones?.data.docs[0].id },
      })
    }
  }, [queryClient, zoneId, savedZoneId, zones?.data?.docs])

  useEffect(() => {
    if (zoneId != undefined) {
      queryClient.invalidateQueries({ queryKey: ['zone'] })
    }
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
