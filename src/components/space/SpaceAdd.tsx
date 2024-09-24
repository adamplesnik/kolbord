import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { getOldToken } from '../../auth/helpers'
import { LATEST_PLACE_METADATA } from '../../utils/constants'
import Button from '../basic/Button'

const SpaceAdd = ({ planId, handlePlaceAdd }: SpaceAddProps) => {
  const latestPlaceMetadata = localStorage.getItem(LATEST_PLACE_METADATA)
  const placeMetadata = '500, 500'

  const [x, y] =
    latestPlaceMetadata != null ? latestPlaceMetadata.split(',') : placeMetadata.split(',')

  const defaultData = {
    data: {
      id: 0,
      name: 'New space',
      x: +x,
      y: +y,
      plan: planId,
      slots: 'halfday',
    },
  }

  const createTable = async (data: NewTableRecord): Promise<NewTableRecord> => {
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

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (data: NewTableRecord) => createTable(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['spaces', planId],
      })
      handlePlaceAdd(data.data.id)
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
  planId: number
  handlePlaceAdd: (placeId: number) => void
}

type NewTableRecord = {
  data: {
    id: number
    name: string
    x: number
    y: number
    plan: number
  }
}

export default SpaceAdd
