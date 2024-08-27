import { CheckCheck, Pencil } from 'lucide-react'
import Button from '../Button'
import PlaceAdd from '../place/PlaceAdd'
import { addWithSpace } from '../../utils/addWithSpace'

const PlanEdit = ({ editMode, planId, handlePlaceAdd, handleEditModeChange }: PlanEditProps) => {
  return (
    <div
      className={
        'flex rounded border p-0.5' +
        addWithSpace(editMode ? 'border-red-600 bg-red-100' : 'border-transparent')
      }
    >
      <Button onClick={handleEditModeChange} Icon={editMode ? CheckCheck : Pencil}></Button>
      {editMode && <PlaceAdd planId={planId} handlePlaceAdd={handlePlaceAdd} />}
    </div>
  )
}

type PlanEditProps = {
  editMode: boolean
  handlePlaceAdd: (id: number) => void
  handleEditModeChange: () => void
  planId: number
}

export default PlanEdit
