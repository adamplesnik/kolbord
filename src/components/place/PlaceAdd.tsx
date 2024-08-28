import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { getToken } from '../../auth/helpers'
import { LATEST_PLACE_METADATA } from '../../utils/constants'
import Button from '../basic/Button'

const PlaceAdd = ({ planId, handlePlaceAdd }: PlaceAddProps) => {
  const latestPlaceMetadata = localStorage.getItem(LATEST_PLACE_METADATA)
  const placeMetadata = '160, 80, 500, 500, 0'

  const [width, height, x, y, rotation] =
    latestPlaceMetadata != null ? latestPlaceMetadata.split(',') : placeMetadata.split(',')

  const defaultData = {
    data: {
      id: 0,
      name: 'New place',
      width: +width,
      height: +height,
      x: +x,
      y: +y,
      rotation: +rotation,
      plan: planId,
    },
  }

  const createTable = async (data: NewTableRecord): Promise<NewTableRecord> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/tables`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${getToken()}`,
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
        queryKey: ['tables'],
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
    ></Button>
  )
}

type PlaceAddProps = {
  planId: number
  handlePlaceAdd: (placeId: number) => void
}

type NewTableRecord = {
  data: {
    id: number
    name: string
    width: number
    height: number
    x: number
    y: number
    rotation: number
    plan: number
  }
}

export default PlaceAdd
