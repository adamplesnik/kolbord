import clsx from 'clsx'
import { CheckCheck, CloudOff, CloudUpload } from 'lucide-react'

const FetchStatus = ({ isPending, isSuccess, isError }: FetchStatusProps) => {
  return (
    <div className="relative flex">
      <CloudUpload
        className={clsx(
          'absolute top-0 right-0 size-4 text-zinc-500 transition-opacity',
          isPending ? 'opacity-100' : 'opacity-0'
        )}
      />
      <CheckCheck
        className={clsx(
          'absolute top-0 right-0 size-5 text-green-500 transition-opacity',
          isSuccess || (!isError && !isPending) ? 'opacity-100' : 'opacity-0'
        )}
      />
      <CloudOff
        className={clsx(
          'absolute top-0 right-0 size-4 text-red-500 transition-opacity',
          isError ? 'opacity-100' : 'opacity-0'
        )}
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
