import { useQuery } from '@tanstack/react-query'
import { getToken } from '../../auth/helpers'
import { TableRecord } from '../../data/TableRecord'
import Place from './Place'

type TableQueryType = {
  data: TableRecord[]
}

const Places = ({ planId, sidebarTableId, handlePlaceClick, editMode }: PlacesProps) => {
  const loadPlaces = async (planId: number): Promise<TableQueryType> => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/tables?populate[features][fields][0]=description&populate[features][fields][1]=lucideIcon&fields[0]=x&fields[1]=y&fields[2]=width&fields[3]=height&fields[4]=name&fields[5]=rotation&fields[6]=available&fields[7]=rounded&fields[8]=chairs&populate[group][fields][0]=name&publicationState=live&locale[0]=en&filters[plan][id][$eq]=${planId}`,
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

  return (
    <>
      {places?.data &&
        places.data.map((t) => (
          <Place
            key={t.id}
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
            onClick={() => {
              handlePlaceClick(t.id)
            }}
            editMode={editMode}
          />
        ))}
    </>
  )
}

type PlacesProps = {
  planId: number
  sidebarTableId: number
  handlePlaceClick: (id: number) => void
  editMode: boolean
}

export default Places
