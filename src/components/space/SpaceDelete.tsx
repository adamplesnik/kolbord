import { useAuth } from '@clerk/clerk-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import Button from '../atoms/Button'
import Paragraph from '../atoms/Paragraph'

const SpaceDelete = ({ id }: SpaceDeleteProps) => {
  const { getToken } = useAuth()
  const [deleteStep, setDeleteStep] = useState(0)

  const deleteSpace = async (id: number) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/spaces/${id}`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error(error)
    } finally {
      // handleDelete() XXX
    }
  }

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: () => deleteSpace(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['spaces'],
      })
    },
  })

  return (
    <div className="mt-2 flex flex-col gap-2 rounded border border-red-200 p-2 text-sm">
      {deleteStep === 0 && (
        <Button className="text-red-600" onClick={() => setDeleteStep(1)}>
          Delete...
        </Button>
      )}
      {deleteStep > 0 && (
        <>
          <div className="text-sm">
            <Paragraph className="font-bold text-red-600">This action cannot be undone!</Paragraph>
            <Paragraph>All bookings related to this place will be deleted as well.</Paragraph>
          </div>
          <div className="flex justify-between">
            <Button buttonType="danger" onClick={() => mutate()}>
              Delete the place
            </Button>
            <Button onClick={() => setDeleteStep(0)}>Cancel</Button>
          </div>
        </>
      )}
    </div>
  )
}

type SpaceDeleteProps = {
  id: number
}

export default SpaceDelete
