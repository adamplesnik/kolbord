import { useQueryClient } from '@tanstack/react-query'
import Heading from '../components/basic/Heading.tsx'
import Spaces from '../components/space/Spaces.tsx'
import Layout from '../partials/Layout.tsx'
import { ZoneType } from '../types/zoneType'

const ListPage = () => {
  const queryClient = useQueryClient()

  const zone: { data: ZoneType } | undefined = queryClient.getQueryData(['zone'])
  return (
    <Layout>
      <div className="mx-auto flex max-w-5xl flex-col gap-1 p-8 pb-24">
        <Heading size={1}>{zone && zone.data.name}</Heading>
        <Spaces listView={true} />
      </div>
    </Layout>
  )
}

export default ListPage
