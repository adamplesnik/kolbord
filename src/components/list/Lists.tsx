import { useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { DateContext, DateContextType } from '../../context/DateContextProvider'
import { ZoneType } from '../../types/zoneType'
import { humanDate } from '../../utils/human'
import Heading from '../basic/Heading'
import Spaces from '../space/Spaces'

const Lists = () => {
  const queryClient = useQueryClient()
  const { date } = useContext(DateContext) as DateContextType

  const zone: { data: ZoneType } | undefined = queryClient.getQueryData(['zone'])

  return (
    <div className="min-h-screen bg-slate-200/0">
      <div className="mx-auto flex max-w-5xl flex-col gap-1 p-8 pb-24">
        <div className="flex items-baseline gap-2 pb-8">
          <Heading size={3}>{zone && zone.data.name}</Heading>
          {date && humanDate(new Date(Date.parse(date.toString())))}
        </div>
        <Spaces listView={true} />
      </div>
    </div>
  )
}

export default Lists
