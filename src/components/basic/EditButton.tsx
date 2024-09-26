import { Check, PencilLine } from 'lucide-react'
import { useIsAdmin } from '../../auth/useIsAdmin'
import Button from './Button'

const EditButton = ({ onClick, className, editMode }: EditButtonProps) => {
  const { isAdmin } = useIsAdmin()

  if (!isAdmin) {
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
