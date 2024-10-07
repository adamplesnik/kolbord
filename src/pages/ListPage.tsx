import { useContext } from 'react'
import Spaces from '../components/space/Spaces.tsx'
import Layout from '../layouts/Layout.tsx'
import { ZoneContext, ZoneContextType } from '../providers/ZoneContextProvider.tsx'

const ListPage = () => {
  const { zone } = useContext(ZoneContext) as ZoneContextType

  return (
    <Layout title={zone && zone.name}>
      <div className="mx-auto flex max-w-5xl flex-col gap-1 px-8 pb-24">
        <Spaces listView={true} />
      </div>
    </Layout>
  )
}

export default ListPage
