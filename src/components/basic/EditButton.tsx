import { Check, Edit2 } from 'lucide-react'
import { useState } from 'react'
import Button from './Button'

const EditButton = ({ onClick }: EditButtonProps) => {
  const [editMode, setEditMode] = useState(false)

  return (
    <Button
      Icon={editMode ? Check : Edit2}
      onClick={() => {
        onClick()
        setEditMode(!editMode)
      }}
    />
  )
}

type EditButtonProps = {
  onClick: () => void
}

export default EditButton
