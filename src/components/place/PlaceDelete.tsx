import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { getToken } from '../../auth/helpers'
import Button from '../basic/Button'
import P from '../basic/P'

const PlaceDelete = ({ id, handleDelete }: PlaceDeleteProps) => {
  const [deleteStep, setDeleteStep] = useState(0)

  const deletePlace = async (id: number) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/tables/${id}`, {
        method: 'delete',
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
      })
    } catch {
    } finally {
      handleDelete()
    }
  }

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: () => deletePlace(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['places'],
      })
      queryClient.invalidateQueries({
        queryKey: ['place', id],
      })
    },
  })

  return (
    <div className="mt-8 flex flex-col gap-2 rounded border border-red-200 p-2 text-sm">
      <Button className="border border-red-400" onClick={() => setDeleteStep(1)}>
        Delete the place...
      </Button>
      {deleteStep > 0 && (
        <>
          <div className="text-sm">
            <P className="pt-2 font-bold text-red-600">This action cannot be undone!</P>
            <P>All bookings related to this place will be deleted as well.</P>
          </div>
          <Button className="bg-red-500 text-white" onClick={() => mutate()}>
            Delete the place
          </Button>
        </>
      )}
    </div>
  )
}

type PlaceDeleteProps = {
  id: number
  handleDelete: () => void
}

export default PlaceDelete
