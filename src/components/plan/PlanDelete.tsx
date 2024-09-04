import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { getToken } from '../../auth/helpers'
import Button from '../basic/Button'
import P from '../basic/P'
import { LATEST_PLAN_ID } from '../../utils/constants'

const PlanDelete = ({
  planId,
  planName,
  planCompanyUuid,
  userCompanyUuid,
  handleDelete,
}: PlanDeleteProps) => {
  const canDelete = planCompanyUuid === userCompanyUuid

  const [deleteStep, setDeleteStep] = useState(0)

  const deletePlan = async (id: number) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/plans/${id}`, {
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
    mutationFn: () => deletePlan(planId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['plans'],
      })
      queryClient.invalidateQueries({
        queryKey: ['places'],
      })
      queryClient.invalidateQueries({
        queryKey: ['plan', planId],
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
            <P className="font-bold text-red-600">This action cannot be undone!</P>
            <P>All places and bookings related to this plan will be deleted as well.</P>
            <P>Write down the plan name to confirm the deletion.</P>
          </div>
          <input
            type="text"
            defaultValue={''}
            className="rounded border-slate-400 bg-slate-50 py-1 px-2 text-sm hover:border-slate-600"
            onChange={(e) => setDeleteStep(e.target.value === planName ? 2 : 1)}
          ></input>
          <div className="flex justify-between">
            <Button
              disabled={deleteStep < 2 && canDelete}
              buttonType="danger"
              onClick={() => mutate()}
            >
              Delete the plan
            </Button>
            <Button onClick={() => setDeleteStep(0)}>Cancel</Button>
          </div>
        </>
      )}
    </div>
  )
}

type PlanDeleteProps = {
  planId: number
  planName: string | undefined
  planCompanyUuid: string | undefined
  userCompanyUuid: string | undefined
  handleDelete: () => void
}

export default PlanDelete
