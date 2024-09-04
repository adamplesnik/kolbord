import { Check, PencilLine } from 'lucide-react'
import { useAuthContext } from '../../auth/AuthContext'
import Button from './Button'

const EditButton = ({ onClick, className, editMode }: EditButtonProps) => {
  const { userCanEdit } = useAuthContext()

  if (!userCanEdit) {
    return ''
  }

  return (
    <Button
      className={className}
      buttonType="primary"
      Icon={editMode ? Check : PencilLine}
      onClick={onClick}
    />
  )
}

type EditButtonProps = {
  onClick: () => void
  editMode: boolean
  className?: string | undefined
}

export default EditButton
