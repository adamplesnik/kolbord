import { CheckCheck, Pencil } from 'lucide-react'
import { useAuthContext } from '../../auth/AuthContext'
import { addWithSpace } from '../../utils/addWithSpace'
import Button from '../basic/Button'
import PlaceAdd from '../place/PlaceAdd'

const PlanEdit = ({ editMode, planId, handlePlaceAdd, handleEditModeChange }: PlanEditProps) => {
  const { user } = useAuthContext()

  const userCanEdit = user?.role && user?.role.id === 3

  return (
    <>
      {userCanEdit ? (
        <div
          className={
            'flex rounded border p-0.5' +
            addWithSpace(editMode ? 'border-red-600 bg-red-100' : 'border-transparent')
          }
        >
          <Button onClick={handleEditModeChange} Icon={editMode ? CheckCheck : Pencil}></Button>
          {editMode && <PlaceAdd planId={planId} handlePlaceAdd={handlePlaceAdd} />}
        </div>
      ) : (
        ''
      )}
    </>
  )
}

type PlanEditProps = {
  editMode: boolean
  handlePlaceAdd: (id: number) => void
  handleEditModeChange: () => void
  planId: number
}

export default PlanEdit
