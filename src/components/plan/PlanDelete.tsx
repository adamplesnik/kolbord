import { useAuth } from '@clerk/clerk-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { LATEST_PLAN_ID } from '../../utils/constants'
import Button from '../basic/Button'
import Paragraph from '../basic/Paragraph'
import { useZone } from './useZone'

const PlanDelete = () => {
  const [deleteStep, setDeleteStep] = useState(0)
  const { zone, zoneId } = useZone()
  const { getToken } = useAuth()

  const deletePlan = async (id: number | undefined) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/zones/${id}`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: () => deletePlan(zoneId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['zones'],
      })
      queryClient.invalidateQueries({
        queryKey: ['spaces'],
      })
      queryClient.invalidateQueries({
        queryKey: ['zone'],
      })
      localStorage.removeItem(LATEST_PLAN_ID)
    },
  })

  return (
    <div className="mt-8 flex flex-col gap-2 rounded border border-red-200 p-2 text-sm">
      {deleteStep === 0 && (
        <Button className="text-red-600" onClick={() => setDeleteStep(1)}>
          Delete...
        </Button>
      )}
      {deleteStep > 0 && (
        <>
          <div className="text-sm">
            <Paragraph className="font-bold text-red-600">This action cannot be undone!</Paragraph>
            <Paragraph>
              All places and bookings related to this plan will be deleted as well.
            </Paragraph>
            <Paragraph>Write down the plan name to confirm the deletion.</Paragraph>
          </div>
          <input
            type="text"
            defaultValue={''}
            className="rounded border-slate-400 bg-slate-50 py-1 px-2 text-sm hover:border-slate-600"
            onChange={(e) => setDeleteStep(e.target.value === zone?.data.name ? 2 : 1)}
          ></input>
          <div className="flex justify-between">
            <Button disabled={deleteStep < 2} buttonType="danger" onClick={() => mutate()}>
              Delete the plan
            </Button>
            <Button onClick={() => setDeleteStep(0)}>Cancel</Button>
          </div>
        </>
      )}
    </div>
  )
}

export default PlanDelete
