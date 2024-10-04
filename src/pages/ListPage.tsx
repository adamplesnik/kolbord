import { useQueryClient } from '@tanstack/react-query'
import Spaces from '../components/space/Spaces.tsx'
import Layout from '../layouts/Layout.tsx'
import { ZoneType } from '../types/zoneType'

const ListPage = () => {
  const queryClient = useQueryClient()

  const zone: { data: ZoneType } | undefined = queryClient.getQueryData(['zone'])
  return (
    <Layout title={zone && zone.data.name}>
      <div className="mx-auto flex max-w-5xl flex-col gap-1 px-8 pb-24">
        <Spaces listView={true} />
      </div>
    </Layout>
  )
}

export default ListPage
