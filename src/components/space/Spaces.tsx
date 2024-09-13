import { useQuery } from '@tanstack/react-query'
import { BracesIcon } from 'lucide-react'
import { useAuthContext } from '../../auth/AuthContext.tsx'
import { getToken } from '../../auth/helpers'
import { BookingQueryType, BookingRecord } from '../../data/BookingRecord'
import { TableRecord } from '../../data/TableRecord'
import Empty from '../basic/Empty.tsx'
import { Value } from '../plan/PlanDateSelector.tsx'
import Space from './Space.tsx'
import Heading from '../basic/Heading.tsx'
import Separator from '../basic/Separator.tsx'

type TableQueryType = {
  data: TableRecord[]
}

const Spaces = ({
  planId,
  sidebarTableId,
  handlePlaceClick,
  handleZoomToElement,
  workingDate,
  listView,
}: SpacesProps) => {
  const { user } = useAuthContext()

  const loadSpaces = async (planId: number): Promise<TableQueryType> => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/tables?fields[0]=x&fields[1]=y&fields[2]=name&populate[group][fields][0]=name&populate[features][fields][0]=id&sort=name&pagination[pageSize]=1000&pagination[withCount]=false&filters[plan][id][$eq]=${planId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    return response.json()
  }

  const { data: spaces } = useQuery({
    queryKey: ['spaces', planId],
    queryFn: () => loadSpaces(planId),
  })

  const loadBookingsForPlan = async (id: number, date: Value): Promise<BookingQueryType> => {
    const today = date && new Date(Date.parse(date.toString())).toISOString()
    let midnight = date && new Date(Date.parse(date.toString()))
    midnight?.setHours(23, 59, 59, 999)
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/bookings?&populate[users_permissions_user][fields][0]=email&populate[users_permissions_user][fields][1]=firstName&populate[users_permissions_user][fields][2]=lastName&populate[table][fields][0]=id&fields[0]=from&fields[1]=to&filters[$and][0][table][plan][id]=${id}&filters[$and][1][from][$gte]=${today}&filters[$and][2][to][$lte]=${midnight?.toISOString()}&sort[0]=from`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    return response.json()
  }

  const { data: bookings } = useQuery({
    queryKey: ['bookings', planId, workingDate],
    queryFn: () => loadBookingsForPlan(planId, workingDate),
  })

  const SpaceComponent = ({
    space,
    allToday,
    bookedToday,
  }: {
    space: TableRecord
    allToday: BookingRecord[] | undefined
    bookedToday: BookingRecord | undefined
  }) => {
    if (space) {
      return (
        <Space
          id={space.id}
          attributes={{
            features: space.attributes.features,
            group: space.attributes.group,
            name: space.attributes.name,
            slots: space.attributes.slots,
            x: space.attributes.x,
            y: space.attributes.y,
          }}
          active={space.id === sidebarTableId}
          bookedToday={bookedToday != undefined}
          bookings={allToday}
          bookedByWho={
            bookedToday &&
            bookedToday?.attributes.users_permissions_user.data.attributes.firstName +
              ' ' +
              bookedToday?.attributes.users_permissions_user.data.attributes.lastName
          }
          bookedByMe={
            bookedToday?.attributes.users_permissions_user.data.attributes.email === user?.email
          }
          onClick={() => {
            handlePlaceClick(space.id)
            handleZoomToElement &&
              setTimeout(() => handleZoomToElement(`space_${space.id.toFixed()}`, 0.75), 400)
          }}
          listView={listView}
        />
      )
    } else {
      return <Empty Icon={BracesIcon} message="No space available"></Empty>
    }
  }

  const groups = [
    ...new Set(spaces?.data.map((space) => space?.attributes?.group?.data?.attributes.name)),
  ].sort()
  console.log(groups.length)

  return (
    <div className={listView ? 'flex flex-col gap-12' : ''}>
      {groups.map((group) => (
        <>
          <div
            key={group}
            className={listView ? 'flex w-full flex-col gap-8 md:flex-row md:items-stretch' : ''}
          >
            {listView && (
              <Heading size={4} className="w-32 shrink-0">
                {group ? group : 'Others'}
              </Heading>
            )}
            <div className={listView ? 'flex w-full flex-col gap-2' : ''}>
              {spaces?.data
                .filter((space) => space?.attributes?.group?.data?.attributes.name === group)
                .map((space, i) => {
                  const bookedToday = bookings?.data.find(
                    (booking) => booking.attributes.table.data.id === space.id
                  )
                  const allToday = bookings?.data.filter(
                    (booking) => booking.attributes.table.data.id === space.id
                  )
                  return (
                    <SpaceComponent
                      allToday={allToday}
                      bookedToday={bookedToday}
                      key={`space_${space.attributes.x}_${space.attributes.y}_${i}`}
                      space={space}
                    />
                  )
                })}
            </div>
          </div>
          {listView && <Separator />}
        </>
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
