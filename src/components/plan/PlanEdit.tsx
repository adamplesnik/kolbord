import { CheckCheck, Pencil } from 'lucide-react'
import Button from '../Button'
import PlaceAdd from '../place/PlaceAdd'

const PlanEdit = ({ editMode, planId, handlePlaceAdd, handleEditModeChange }: PlanEditProps) => {
  return (
    <div className={'flex rounded p-0.5' + (editMode && ' bg-pink-300')}>
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
