import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { getOldToken } from '../../auth/helpers'
import { LATEST_PLACE_METADATA } from '../../utils/constants'
import Button from '../basic/Button'
import { SpaceType } from './spaceType'

const SpaceAdd = ({ planId, handlePlaceAdd }: SpaceAddProps) => {
  const queryClient = useQueryClient()

  const latestPlaceMetadata = localStorage.getItem(LATEST_PLACE_METADATA)
  const placeMetadata = '500, 500'

  const [x, y] =
    latestPlaceMetadata != null ? latestPlaceMetadata.split(',') : placeMetadata.split(',')

  const defaultData: SpaceType = {
    id: 0,
    name: 'New space',
    x: +x,
    y: +y,
    // group: {
    //   relationTo: 'zone-groups',
    //   value: { id: 0 },
    // },
    zone: {
      relationTo: 'zones',
      value: planId || 0,
    },
    slots: 'halfday',
  }

  const createTable = async (data: SpaceType): Promise<SpaceType> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/tables`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${getOldToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.json()
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
