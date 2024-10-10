import { useAuth } from '@clerk/clerk-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Plus } from 'lucide-react'
import { useContext } from 'react'
import { useIsAdmin } from '../../hooks/useIsAdmin'
import { EditModeContext, EditModeContextType } from '../../providers/EditModeContextProvider'
import { ZoneContext, ZoneContextType } from '../../providers/ZoneContextProvider'
import { ZoneType } from '../../types/zoneType'
import { NEW_PLAN_SVG } from '../../utils/constants'
import Button from '../atoms/Button'

const addZone = async (
  orgId: string | null | undefined,
  getToken: () => Promise<string | null>
): Promise<{ data: { doc: ZoneType | undefined } }> => {
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

const ZoneAdd = () => {
  const { editMode } = useContext(EditModeContext) as EditModeContextType
  const { getToken, orgId } = useAuth()
  const { isAdmin } = useIsAdmin()
  const { setZone } = useContext(ZoneContext) as ZoneContextType
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: () => addZone(orgId, getToken),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['zones'] })
      console.log(response)
      setZone(response?.data.doc)
    },
  })

  if (!isAdmin && !editMode) {
    return null
  }

  return (
    <Button Icon={Plus} onClick={() => mutate()} className="w-full">
      New plan
    </Button>
  )
}

export default ZoneAdd
