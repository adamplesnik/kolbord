import GroupMarker from './GroupMarker'
import { useGroupsForPlanQuery } from './loadGroup'

const GroupMarkers = ({ planId }: GroupMarkersProps) => {
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
                />
              )
          )}
      </div>
    )
  }
}

type GroupMarkersProps = {
  planId: number
}

export default GroupMarkers
