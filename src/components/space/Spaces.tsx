import { useQuery } from '@tanstack/react-query'
import { getToken } from '../../auth/helpers'
import { BookingQueryType } from '../../data/BookingRecord'
import { TableRecord } from '../../data/TableRecord'
import Space from './Space.tsx'
import { useAuthContext } from '../../auth/AuthContext.tsx'

type TableQueryType = {
  data: TableRecord[]
}

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

const Spaces = ({ planId, sidebarTableId, handlePlaceClick, workingDate }: SpacesProps) => {
  const { user } = useAuthContext()

  const loadPlaces = async (planId: number): Promise<TableQueryType> => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/tables?fields[0]=x&fields[1]=y&fields[2]=name&populate[group][fields][0]=name&publicationState=live&pagination[pageSize]=1000&pagination[withCount]=false&filters[plan][id][$eq]=${planId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    return response.json()
  }

  const { data: places } = useQuery({
    queryKey: ['places', planId],
    queryFn: () => loadPlaces(planId),
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

  return (
    <>
      {places?.data &&
        places.data.map((t) => {
          const bookedToday = bookings?.data.find(
            (booking) => booking.attributes.table.data.id === t.id
          )
          const allToday = bookings?.data.filter(
            (booking) => booking.attributes.table.data.id === t.id
          )

          return (
            <Space
              key={`place_${t.id}`}
              id={t.id}
              attributes={{
                name: t.attributes.name,
                group: t.attributes.group,
                x: t.attributes.x,
                y: t.attributes.y,
                features: t.attributes.features,
                slots: t.attributes.slots,
              }}
              active={t.id === sidebarTableId}
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
                handlePlaceClick(t.id)
              }}
            />
          )
        })}
    </>
  )
}

type SpacesProps = {
  planId: number
  sidebarTableId: number
  handlePlaceClick: (id: number) => void
  workingDate: Value
}

export default Spaces
