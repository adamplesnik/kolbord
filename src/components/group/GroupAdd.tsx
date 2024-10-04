import { useAuth } from '@clerk/clerk-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Plus } from 'lucide-react'
import { useZone } from '../../hooks/useZone'
import { GroupType } from '../../types/groupType'
import Button from '../basic/Button'

const GroupAdd = () => {
  const { getToken, orgId } = useAuth()
  const { zoneId } = useZone()

  const addGroup = async (zoneId: number | undefined): Promise<{ data: { docs: GroupType[] } }> => {
    return await axios.post(
      `${import.meta.env.VITE_API_URL}/zone-groups`,
      JSON.stringify({
        name: 'New group',
        description: 'Description',
        showMarker: true,
        x: 500,
        y: 500,
        zone: {
          relationTo: 'zones',
          value: zoneId,
        },
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
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: () => addGroup(zoneId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['groups', zoneId],
      })
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

export default GroupAdd
