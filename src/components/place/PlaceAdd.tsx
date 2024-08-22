import { Plus } from 'lucide-react'
import { getToken } from '../../auth/helpers'
import Button from '../Button'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const PlaceAdd = ({ planId, handlePlaceAdd }: PlaceAddProps) => {
  const defaultData = {
    data: {
      id: 0,
      name: 'New place',
      x: 500,
      y: 500,
      rotation: 0,
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
    >
      <Plus />
    </Button>
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
    x: number
    y: number
    rotation: number
    plan: number
  }
}

export default PlaceAdd
