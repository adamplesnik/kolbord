import { useContext } from 'react'
import Heading from '../components/basic/Heading.tsx'
import Spaces from '../components/space/Spaces.tsx'
import { ZoneContext, ZoneContextType } from '../providers/ZoneContextProvider.tsx'

const ListPage = () => {
  const { zone } = useContext(ZoneContext) as ZoneContextType

  return (
    <>
      <div className="mx-auto flex max-w-5xl p-8">
        {zone?.name && <Heading size={1}>{zone?.name}</Heading>}
      </div>
      <div className="mx-auto flex max-w-5xl flex-col gap-1 px-8 pb-24">
        <Spaces listView={true} />
      </div>
    </>
  )
}

export default ListPage
