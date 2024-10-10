import { useAuth } from '@clerk/clerk-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Plus } from 'lucide-react'
import { useContext } from 'react'
import { SidebarContext, SidebarContextType } from '../../providers/SidebarContextProvider'
import { SpaceType } from '../../types/spaceType'
import { LATEST_SPACE_METADATA } from '../../utils/constants'
import Button from '../atoms/Button'

const SpaceAdd = ({ planId }: SpaceAddProps) => {
  const queryClient = useQueryClient()
  const { getToken, orgId } = useAuth()
  const { setSidebarState } = useContext(SidebarContext) as SidebarContextType

  const latestPlaceMetadata = localStorage.getItem(LATEST_SPACE_METADATA)
  const placeMetadata = '500, 500'

  const [x, y] =
    latestPlaceMetadata != null ? latestPlaceMetadata.split(',') : placeMetadata.split(',')

  const defaultData: SpaceType = {
    id: 0,
    name: 'New space',
    x: +x,
    y: +y,
    zone: {
      relationTo: 'zones',
      value: planId || 0,
    },
    slots: 'halfday',
    org: orgId,
  }

  const createTable = async (data: SpaceType): Promise<SpaceType> => {
    return await axios.post(`${import.meta.env.VITE_API_URL}/spaces`, JSON.stringify(data), {
      method: 'post',
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        'Content-Type': 'application/json',
      },
    })
  }

  const { mutate } = useMutation({
    mutationFn: (data: SpaceType) => createTable(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['spaces', planId],
      })
      setSidebarState({ title: data.name, space: data })
    },
  })

  return (
    <Button
      onClick={() => {
        mutate(defaultData)
      }}
      Icon={Plus}
      className="w-full"
    >
      New space
    </Button>
  )
}

type SpaceAddProps = {
  planId: number | undefined
}

export default SpaceAdd
