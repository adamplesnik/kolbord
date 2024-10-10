import { useContext } from 'react'
import { ZoneContext, ZoneContextType } from '../../providers/ZoneContextProvider'
import Heading from '../atoms/Heading'
import Spaces from '../space/Spaces'

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
