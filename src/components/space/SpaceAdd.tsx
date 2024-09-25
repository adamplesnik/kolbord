import { useAuth } from '@clerk/clerk-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Plus } from 'lucide-react'
import { LATEST_PLACE_METADATA } from '../../utils/constants'
import Button from '../basic/Button'
import { SpaceType } from './spaceType'

const SpaceAdd = ({ planId, handlePlaceAdd }: SpaceAddProps) => {
  const queryClient = useQueryClient()
  const { getToken, orgId } = useAuth()

  const latestPlaceMetadata = localStorage.getItem(LATEST_PLACE_METADATA)
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
      handlePlaceAdd(data)
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
  handlePlaceAdd: (space: SpaceType) => void
}

export default SpaceAdd
