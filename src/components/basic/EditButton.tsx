import { Check, PencilLine } from 'lucide-react'
import { useContext } from 'react'
import { useIsAdmin } from '../../hooks/useIsAdmin'
import { EditModeContext, EditModeContextType } from '../../providers/EditModeContextProvider'
import Button from './Button'

const EditButton = ({ className }: EditButtonProps) => {
  const { isAdmin } = useIsAdmin()
  const { editMode, setEditMode } = useContext(EditModeContext) as EditModeContextType

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  if (!isAdmin) {
    return null
  }

  return (
    <Button
      className={className}
      buttonType={editMode ? 'danger' : 'menu'}
      Icon={editMode ? Check : PencilLine}
      onClick={toggleEditMode}
    />
  )
}

type EditButtonProps = {
  className?: string | undefined
}

export default EditButton
