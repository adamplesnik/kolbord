import { useEffect } from 'react'
import { useGroupQuery } from './groupFetch'

const GroupDetail = ({ editMode, groupId, sendTitle }: GroupDetailProps) => {
  const { data: group } = useGroupQuery(groupId)

  useEffect(() => {
    sendTitle(group?.data.attributes.name)
  }, [group?.data.attributes.name])

  return <div>{group?.data.attributes.name}</div>
}

type GroupDetailProps = {
  editMode: boolean
  groupId: number
  sendTitle: (title: string | undefined) => void
}

export default GroupDetail
