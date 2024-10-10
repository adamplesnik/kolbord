import { useAuth } from '@clerk/clerk-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Plus } from 'lucide-react'
import { useContext } from 'react'
import { ZoneContext, ZoneContextType } from '../../providers/ZoneContextProvider'
import { GroupType } from '../../types/groupType'
import Button from '../basic/Button'

const GroupAdd = () => {
  const { getToken, orgId } = useAuth()
  const { zone } = useContext(ZoneContext) as ZoneContextType

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
    mutationFn: () => addGroup(zone?.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['groups', zone?.id],
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
