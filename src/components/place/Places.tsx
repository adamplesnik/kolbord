import { useQuery } from '@tanstack/react-query'
import { getToken } from '../../auth/helpers'
import { BookingQueryType } from '../../data/BookingRecord'
import { TableRecord } from '../../data/TableRecord'
import Place from './Place'

type TableQueryType = {
  data: TableRecord[]
}

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

const Places = ({ planId, sidebarTableId, handlePlaceClick, workingDate }: PlacesProps) => {
  const loadPlaces = async (planId: number): Promise<TableQueryType> => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/tables?populate[features][fields][0]=description&populate[features][fields][1]=lucideIcon&fields[0]=x&fields[1]=y&fields[2]=width&fields[3]=height&fields[4]=name&fields[5]=rotation&fields[6]=available&fields[7]=rounded&fields[8]=chairs&populate[group][fields][0]=name&publicationState=live&pagination[pageSize]=1000&pagination[withCount]=false&filters[plan][id][$eq]=${planId}`,
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
      `${import.meta.env.VITE_API_URL}/bookings?&populate[users_permissions_user][fields][0]=email&populate[users_permissions_user][fields][1]=firstName&populate[users_permissions_user][fields][2]=lastName&populate[table][fields][0]=id&fields[0]=from&fields[1]=to&filters[$and][0][table][plan][id]=${id}&filters[$and][1][from][$gte]=${today}&filters[$and][2][to][$lte]=${midnight?.toISOString()}`,
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

  console.log(bookings?.data)

  return (
    <>
      {places?.data &&
        places.data.map((t) => (
          <Place
            key={`place_${t.id}`}
            id={t.id}
            attributes={{
              name: t.attributes.name,
              group: t.attributes.group,
              rotation: t.attributes.rotation,
              x: t.attributes.x,
              y: t.attributes.y,
              available: t.attributes.available,
              features: t.attributes.features,
              width: t.attributes.width,
              height: t.attributes.height,
              rounded: t.attributes.rounded,
              chairs: t.attributes.chairs,
              slots: t.attributes.slots,
            }}
            active={t.id === sidebarTableId}
            bookedToday={
              bookings?.data.find((booking) => booking.attributes.table.data.id === t.id) !=
              undefined
            }
            onClick={() => {
              handlePlaceClick(t.id)
            }}
          />
        ))}
    </>
  )
}

type PlacesProps = {
  planId: number
  sidebarTableId: number
  handlePlaceClick: (id: number) => void
  workingDate: Value
}

export default Places
