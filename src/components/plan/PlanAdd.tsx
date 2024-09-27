import { useAuth } from '@clerk/clerk-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Plus } from 'lucide-react'
import { PlanType } from '../../types/spaceType'
import { NEW_PLAN_SVG } from '../../utils/constants'
import Button from '../basic/Button'

const PlanAdd = () => {
  const { getToken, orgId } = useAuth()
  const queryClient = useQueryClient()

  const addPlan = async (): Promise<PlanType | undefined> => {
    return await axios.post(
      `${import.meta.env.VITE_API_URL}/zones`,
      JSON.stringify({
        name: 'New plan',
        svg: NEW_PLAN_SVG,
        org: orgId,
      }),
      {
        method: 'post',
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          'Content-Type': 'application/json',
        },
      }
    )
  }

  const { mutate } = useMutation({
    mutationFn: () => addPlan(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['zones'] })
      queryClient.invalidateQueries({ queryKey: ['zone'] })
    },
  })
  return (
    <Button Icon={Plus} onClick={() => mutate()} className="w-full">
      New plan
    </Button>
  )
}

export default PlanAdd
