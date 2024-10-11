import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { BracesIcon } from 'lucide-react'
import qs from 'qs'
import { Fragment, useContext } from 'react'
import { DateContext, DateContextType, Value } from '../../providers/DateContextProvider.tsx'
import { ZoneContext, ZoneContextType } from '../../providers/ZoneContextProvider.tsx'
import { BookingType } from '../../types/bookingType'
import { SpaceType } from '../../types/spaceType'
import Separator from '../atoms/Separator.tsx'
import Empty from '../basic/Empty.tsx'
import Space from './Space.tsx'

const loadSpaces = async (
  zoneId: number | undefined,
  getToken: () => Promise<string | null>
): Promise<{ data: { docs: SpaceType[] } }> => {
  const query = qs.stringify({
    where: {
      'zone.value': {
        equals: zoneId,
      },
    },
  })

  return axios(`${import.meta.env.VITE_API_URL}/spaces?${query}&depth=1&sort=name`, {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
  })
}

const loadBookingsForZone = async (
  zoneId: number | undefined,
  date: Value,
  getToken: () => Promise<string | null>
): Promise<{ data: { docs: BookingType[] } }> => {
  const today = date && new Date(Date.parse(date.toString())).toISOString()
  const midnight = date && new Date(Date.parse(date.toString()))
  midnight?.setHours(23, 59, 59, 999)

  const query = qs.stringify({
    where: {
      and: [
        {
          space: {
            'zone.value': {
              equals: zoneId,
            },
          },
          from: {
            greater_than_equal: today,
          },
          to: {
            less_than_equal: midnight,
          },
        },
      ],
    },
  })

  return axios.get(`${import.meta.env.VITE_API_URL}/bookings?${query}`, {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
  })
}

const Spaces = ({ listView }: SpacesProps) => {
  const { getToken } = useAuth()
  const { zone } = useContext(ZoneContext) as ZoneContextType
  const { date } = useContext(DateContext) as DateContextType

  const { data: spaces } = useQuery({
    queryKey: ['spaces', zone?.id],
    enabled: zone?.id != undefined,
    queryFn: () => loadSpaces(zone?.id, getToken),
  })

  const { data: bookings } = useQuery({
    queryKey: ['bookings', zone?.id, date],
    queryFn: () => loadBookingsForZone(zone?.id, date, getToken),
  })

  const groups = [...new Set(spaces?.data.docs.map((space) => space?.group?.value?.name))].sort()

  if (!spaces) {
    return <Empty Icon={BracesIcon} message="No spaces available."></Empty>
  }

  return (
    <div className={listView ? 'flex flex-col' : 'relative'}>
      {groups.map((group) => (
        <Fragment key={`${group}_group`}>
          <div
            className={
              listView ? 'flex w-full flex-col gap-2 md:flex-row md:items-stretch md:gap-8' : ''
            }
          >
            {listView && (
              <div className="w-32 shrink-0 pt-4 text-xs text-zinc-500 md:py-8">
                {group ? group : '(no group)'}
              </div>
            )}
            {listView && <Separator vertical />}
            <div className={listView ? 'flex w-full flex-col gap-2 md:py-8' : ''}>
              {spaces?.data.docs
                .filter((space) => space?.group?.value?.name === group)
                .map((space, i) => {
                  const allToday = bookings?.data.docs.filter(
                    (booking) => booking.space.value === space.id
                  )
                  return (
                    <Space
                      space={space}
                      bookings={allToday}
                      key={`space_${space.x}_${space.y}_${i}`}
                      listView={listView}
                    />
                  )
                })}
            </div>
          </div>
          {listView && <Separator />}
        </Fragment>
      ))}
    </div>
  )
}

type SpacesProps = {
  listView: boolean
}

export default Spaces
