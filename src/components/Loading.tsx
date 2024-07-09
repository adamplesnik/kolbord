import { Loader2 } from 'lucide-react'

const Loading = ({ loading = false }) => {
  return loading ? (
    <div className="flex w-full items-center justify-center py-4">
      <Loader2 className="size-12 animate-spin" />
    </div>
  ) : (
    <></>
  )
}

export default Loading
