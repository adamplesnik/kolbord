import GroupMarker from './GroupMarker'
import { useGroupsForPlanQuery } from './loadGroup'

const GroupMarkers = ({ planId, onMarkerClick }: GroupMarkersProps) => {
  const editMode = false

  const { data: markers, isSuccess } = useGroupsForPlanQuery(planId)

  if (isSuccess) {
    return (
      <div>
        {markers.data &&
          markers.data.map(
            (m, i) =>
              m.attributes.showMarker && (
                <GroupMarker
                  className={editMode ? 'cursor-pointer hover:border-pink-400' : ''}
                  key={`group${i}`}
                  groupName={m.attributes.name}
                  groupDescription={m.attributes.description}
                  x={m.attributes.x}
                  y={m.attributes.y}
                  onClick={() => editMode && onMarkerClick(m.id)}
                />
              )
          )}
      </div>
    )
  }
}

type GroupMarkersProps = {
  planId: number
  onMarkerClick: (id: number) => void
}

export default GroupMarkers
