import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import Button from '../basic/Button'
import { addGroup } from './groupFetch'
import { GroupRecord } from '../../data/GroupRecord'

const GroupAdd = ({ planId, handleGroupAdd }: GroupAddProps) => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: () => addGroup(planId),
    onSuccess: (data: GroupRecord) => {
      queryClient.invalidateQueries({
        queryKey: ['groups', planId],
      })
      handleGroupAdd(data.id)
    },
  })

  return (
    <Button
      onClick={() => {
        mutate()
      }}
      Icon={Plus}
      className="w-full"
    >
      New group
    </Button>
  )
}

type GroupAddProps = {
  planId: number
  handleGroupAdd: (groupId: number) => void
}

export default GroupAdd
