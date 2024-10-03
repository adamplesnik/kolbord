import { Check, PencilLine } from 'lucide-react'
import { useContext } from 'react'
import { useIsAdmin } from '../../auth/useIsAdmin'
import { EditModeContext, EditModeContextType } from '../../context/EditModeContextProvider'
import Button from './Button'

const EditButton = ({ className }: EditButtonProps) => {
  const { isAdmin } = useIsAdmin()
  const { editMode, setEditMode } = useContext(EditModeContext) as EditModeContextType

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  if (!isAdmin) {
    return ''
  }

  return (
    <Button
      className={className}
      buttonType={editMode ? 'danger' : 'primary'}
      Icon={editMode ? Check : PencilLine}
      onClick={toggleEditMode}
    />
  )
}

type EditButtonProps = {
  className?: string | undefined
}

export default EditButton
