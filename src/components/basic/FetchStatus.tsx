import { CloudUpload, CheckCheck, CloudOff } from 'lucide-react'
import { addWithSpace } from '../../utils/addWithSpace'

const FetchStatus = ({ isPending, isSuccess, isError }: FetchStatusProps) => {
  return (
    <div className="relative flex">
      <CloudUpload
        className={
          'absolute top-0 right-0 size-4 text-slate-500 transition-opacity' +
          addWithSpace(isPending ? 'opacity-100' : 'opacity-0')
        }
      />
      <CheckCheck
        className={
          'absolute top-0 right-0 size-5 text-green-500 transition-opacity' +
          addWithSpace(isSuccess || (!isError && !isPending) ? 'opacity-100' : 'opacity-0')
        }
      />
      <CloudOff
        className={
          'absolute top-0 right-0 size-4 text-red-500 transition-opacity' +
          addWithSpace(isError ? 'opacity-100' : 'opacity-0')
        }
      />
    </div>
  )
}

type FetchStatusProps = {
  isPending: boolean
  isSuccess: boolean
  isError: boolean
}

export default FetchStatus
