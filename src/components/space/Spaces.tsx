import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { BracesIcon } from 'lucide-react'
import qs from 'qs'
import { Fragment } from 'react'
import { BookingQueryType } from '../../data/BookingRecord'
import Empty from '../basic/Empty.tsx'
import Heading from '../basic/Heading.tsx'
import Separator from '../basic/Separator.tsx'
import { Value } from '../plan/PlanDateSelector.tsx'
import Space from './Space.tsx'
import { SpaceType } from './spaceType'

const Spaces = ({
  planId: zoneId,
  sidebarTableId,
  handlePlaceClick,
  handleZoomToElement,
  workingDate,
  listView,
}: SpacesProps) => {
  const { getToken, userId } = useAuth()
  const loadSpaces = async (planId: number): Promise<{ data: { docs: SpaceType[] } }> => {
    return axios(
      `${import.meta.env.VITE_API_PAYLOAD_URL}/spaces?where[zones][id][equals]=${planId}&depth=1`,
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    )
  }

  const { data: spaces } = useQuery({
    queryKey: ['spaces', zoneId],
    queryFn: () => loadSpaces(zoneId),
  })

  console.log(spaces)

  const loadBookingsForZone = async (zoneId: number, date: Value): Promise<BookingQueryType> => {
    const today = date && new Date(Date.parse(date.toString())).toISOString()
    const midnight = date && new Date(Date.parse(date.toString()))
    midnight?.setHours(23, 59, 59, 999)

    const query = qs.stringify({
      where: {
        and: [
          {
            space: {
              'zone.id': {
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

    return axios.get(`${import.meta.env.VITE_API_PAYLOAD_URL}/bookings?${query}`, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    })
  }

  const { data: bookings } = useQuery({
    queryKey: ['bookings', zoneId, workingDate],
    queryFn: () => loadBookingsForZone(zoneId, workingDate),
  })

  const groups = [...new Set(spaces?.data.docs.map((space) => space?.group?.value))].sort()

  if (!spaces) {
    return <Empty Icon={BracesIcon} message="No space available"></Empty>
  }

  return (
    <div className={listView ? 'flex flex-col' : ''}>
      {groups.map((group) => (
        <Fragment key={group.id}>
          <div
            className={listView ? 'flex w-full flex-col gap-8 md:flex-row md:items-stretch' : ''}
          >
            {listView && (
              <Heading size={4} className="w-32 shrink-0 py-8">
                {group.name ? group.name : '(no group)'}
              </Heading>
            )}
            {listView && <Separator horizontal />}
            <div className={listView ? 'flex w-full flex-col gap-2 py-8' : ''}>
              {spaces?.data.docs
                .filter((space) => space?.group?.value === group)
                .map((space, i) => {
                  const bookedToday = bookings?.data.docs.find(
                    (booking) => booking.space.value === space.id
                  )
                  const allToday = bookings?.data.docs.filter(
                    (booking) => booking.space.value === space.id
                  )
                  return (
                    <Space
                      id={space.id}
                      features={space.features}
                      group={space.group}
                      name={space.name}
                      slots={space.slots}
                      x={space.x}
                      y={space.y}
                      active={space.id === sidebarTableId}
                      bookedToday={bookedToday != undefined}
                      bookings={allToday}
                      bookedByWho={bookedToday?.sub}
                      bookedByMe={bookedToday?.sub === userId}
                      onClick={() => {
                        handlePlaceClick(space.id)
                        handleZoomToElement &&
                          setTimeout(
                            () => handleZoomToElement(`space_${space.id.toFixed()}`, 0.75),
                            400
                          )
                      }}
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
  planId: number
  sidebarTableId: number
  handlePlaceClick: (id: number) => void
  handleZoomToElement?: (id: string, zoom: number) => void | undefined
  workingDate: Value
  listView: boolean
}

export default Spaces
