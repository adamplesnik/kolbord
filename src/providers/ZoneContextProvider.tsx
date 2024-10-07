import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import qs from 'qs'
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react'
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
  setZone: Dispatch<SetStateAction<ZoneType | undefined>>
  zones: ZoneType[] | undefined
  isLoading: boolean
}

export const ZoneContext = createContext<ZoneContextType | null>(null)

const ZoneContextProvider = ({ children }: PropsWithChildren) => {
  const { getToken } = useAuth()
  const [zone, setZone] = useState<ZoneType | undefined>(undefined)

  const { data: zonesQuery } = useQuery({
    queryKey: ['zones'],
    queryFn: () => loadZones(getToken),
  })

  const { data: zoneQuery, isLoading } = useQuery({
    queryKey: ['zone', zone?.id],
    enabled: zone?.id != undefined,
    queryFn: () => loadZone(zone?.id, getToken),
    staleTime: 1000 * 60 * 10,
  })

  useEffect(() => {
    setZone(zoneQuery?.data)
  }, [zoneQuery, zone, setZone])

  const zones = zonesQuery?.data.docs

  return (
    <ZoneContext.Provider value={{ zone, setZone, zones, isLoading }}>
      {children}
    </ZoneContext.Provider>
  )
}

export default ZoneContextProvider
