import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import qs from 'qs'
import { PropsWithChildren, createContext, useState } from 'react'
import { ZoneType } from '../types/zoneType'

const loadZones = async (
  getToken: () => Promise<string | null>
): Promise<{ data: { docs: ZoneType[] } } | undefined> => {
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

const loadZone = async (
  zoneId: number | undefined,
  getToken: () => Promise<string | null>
): Promise<{ data: ZoneType } | undefined> => {
  return axios.get(`${import.meta.env.VITE_API_URL}/zones/${zoneId}`, {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
      'Content-Type': 'application/json',
    },
  })
}

export type ZoneContextType = {
  zone: ZoneType | undefined
  setZone: (z: ZoneType | undefined) => void
  zones: ZoneType[] | undefined
  isLoading: boolean
}

export const ZoneContext = createContext<ZoneContextType | null>(null)

const ZoneContextProvider = ({ children }: PropsWithChildren) => {
  const { getToken } = useAuth()
  const [zoneId, setZoneId] = useState<number | undefined>(undefined)

  const { data: zonesQuery } = useQuery({
    queryKey: ['zones'],
    queryFn: () => loadZones(getToken),
  })

  const { data: zoneQuery, isLoading } = useQuery({
    queryKey: ['zone', zoneId],
    enabled: zoneId != undefined,
    queryFn: () => loadZone(zoneId, getToken),
    staleTime: 1000 * 60 * 10,
  })

  const zones = zonesQuery?.data.docs
  const zone = zoneQuery?.data

  const setZone = (z: ZoneType | undefined) => {
    setZoneId(z?.id)
  }

  return (
    <ZoneContext.Provider value={{ zone, setZone, zones, isLoading }}>
      {children}
    </ZoneContext.Provider>
  )
}

export default ZoneContextProvider
