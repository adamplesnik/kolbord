import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import qs from 'qs'
import { PropsWithChildren, createContext, useState } from 'react'
import { ZoneType } from '../types/zoneType'
import { LATEST_ZONE_ID } from '../utils/constants'

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
  const savedZoneId = Number(localStorage.getItem(LATEST_ZONE_ID))
  const { getToken } = useAuth()

  const [zoneId, setZoneId] = useState<number | undefined>(savedZoneId ? savedZoneId : undefined)

  const { data: zonesQuery } = useQuery({
    queryKey: ['zones'],
    queryFn: () => loadZones(getToken),
  })

  const { data: zoneQuery, isLoading } = useQuery({
    queryKey: ['zone', zoneId],
    enabled: zoneId != undefined,
    queryFn: () => loadZone(zoneId, getToken),
  })

  const zones = zonesQuery?.data.docs
  const zone = zoneQuery?.data

  const setZone = (z: ZoneType | undefined) => {
    if (z === undefined) {
      setZoneId(zonesQuery?.data.docs[0].id)
    } else {
      setZoneId(z.id)
    }

    if (z?.id) {
      localStorage.setItem(LATEST_ZONE_ID, String(z.id))
    } else {
      localStorage.removeItem(LATEST_ZONE_ID)
    }
  }

  return (
    <ZoneContext.Provider value={{ zone, setZone, zones, isLoading }}>
      {children}
    </ZoneContext.Provider>
  )
}

export default ZoneContextProvider
